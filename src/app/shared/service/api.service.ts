import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';
import { v4 as uuid } from 'uuid';
import { DataType, EventSchema, CalendarEvent, DynamoItem, UploadType, UnsortedDynamoItem, OtherItem, SchemaItem } from '../shared/model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalDataStore } from 'src/environments/localData';

const headers = {
  // 'Content-Type': 'application/json',
}

@Injectable({
  providedIn: 'root',
})
export class APIService {
  private url = (fn: string): string => environment.url+fn;
  private headers = (token: string): {} => ({ headers: {...headers, Authorization: 'Bearer ' + token } })
  private localDataStore = new LocalDataStore();
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastService: ToastService,
  ) {}

  public loadClientData(): Observable<UnsortedDynamoItem[]> {
    if (!environment.production) return of(this.localDataStore.mockData);
    return this.authService.getToken().pipe(
      switchMap((token) => {
        return token ?
          this.http.get<UnsortedDynamoItem[]>(this.url('load'), this.headers(token)) :
          of(undefined);
      }),
      map((v) => {
        if (!v) {
          this.toastService.show('Your session has expired, please sign in again');
          this.authService.signOut();
          return [];
        }
        return v;
      }),
      shareReplay(),
      catchError((error) => {
        this.toastService.show('Error searching for events, please try again later', 'error');
        console.log(error);
        return of([]);
      }),
    );
  }

  public deleteEvent(id: string): Observable<boolean> {
    if (!environment.production) return this.localDataStore.removeFromLocalData(id);
    return this.authService.getToken().pipe(
      switchMap((token) => {
        return token ?
          this.http.post(this.url('delete_obj'), { id }, this.headers(token)) :
          of(-1);
      }),
      map((v) => {
        if (v === -1) {
          this.toastService.show('Your session has expired, please sign in again');
          this.authService.signOut();
        }
        return v !== -1;
      }),
      catchError((error) => {
        this.toastService.show('Error deleting event, please try again later', 'error');
        console.log(error);
        return of(false);
      }),
    );
  }

  public putObj(event: CalendarEvent | DynamoItem | OtherItem | SchemaItem, type: DataType): Observable<boolean> {
    if (!environment.production) return this.localDataStore.addToLocalData(event);
    event.clientId = this.authService.userId!;
    event.type = type;
    return this.authService.getToken().pipe(
      switchMap((token) => {
        return token ?
          this.http.put(this.url('put_obj'), event, this.headers(token)) :
          of(-1);
      }),
      map((v) => {
        if (v === -1) {
          this.toastService.show('Your session has expired, please sign in again');
          this.authService.signOut();
        }
        return v !== -1;
      }),
      catchError((error) => {
        this.toastService.show('Error creating event, please try again later', 'error');
        console.log(error);
        return of(false);
      }),
    );
  }

  public uploadImage(image: File, uploadType: UploadType, eventId?: string): Observable<boolean> {
    if (!environment.production) return of(!!image);
    return this.authService.getToken().pipe(
      switchMap((token) => {
        return token ?
          this.http.post<any>(
            this.url('get_upload_url'), 
            { uploadType, fileName: image.name, eventId },
            this.headers(token),
          ) :
          of(undefined);
      }),
      switchMap((urlResp) => {
        if (!urlResp?.url) {
          return of(-1);
        }
        return this.http.put(urlResp.url, image);
      }),
      map((v) => {
        if (v === -1) {
          this.toastService.show('Your session has expired, please sign in again', 'error');
          this.authService.signOut();
        }
        return v !== -1;
      }),
      catchError((error) => {
        this.toastService.show('Error uploading file, please try again later', 'error');
        return of(false);
      }),
    );
  }

  public sendEmail(params: { subject: string, body: string }) {
    if (!environment.production) return of(true);
    return this.authService.getToken().pipe(
      switchMap((token) => token ? this.http.post(this.url('email'), params, this.headers(token)) : of(undefined)),
      catchError((error) => {
        this.toastService.show('Error sending email request, please try again later', 'error');
        return of(false);
      }),
    );
  }
}
