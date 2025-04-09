import { Injectable } from '@angular/core';
import { Toast } from '../../shared/model';
import { EventEmitter } from '@angular/core';;

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new EventEmitter<Toast>();
  toasts$ = this.toastsSubject.asObservable();
  private toastId = 0;

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration = 3000) {
    const id = this.toastId++;
    const toast: Toast = { message, type, id, duration };
    this.toastsSubject.next(toast);
  }
}
