import { Component } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Toast } from '../../model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule],
})
export class ToastComponent {
  toasts$: Observable<Toast[]>;
  constructor(private toastService: ToastService) {
    this.toasts$ = this.toastService.toasts$;
  }
}
