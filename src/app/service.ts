import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Service {
  constructor(private http: HttpClient) {}

  public get(url: string): Observable<any> {
      return this.http.get(url)
  }
}
