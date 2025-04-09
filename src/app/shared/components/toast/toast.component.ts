import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastService } from '../../service/toast.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Toast } from '../../model';
import { first, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  imports: [CommonModule],
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {}
  ngOnInit(): void {
    this.toastService.toasts$.subscribe((toast) => {
      this.toasts.push(toast);
      this.setStatus(toast);
    });
  }

  setStatus = (toast: Toast) => timer(50).pipe(
    first(),
    switchMap(() => { toast.active = true; return timer(toast.duration); }),
    first(),
    switchMap(() => {toast.active = false; return timer(300)})
  ).subscribe(() => this.toasts = this.toasts.filter((t) => t.id !== toast.id));
}
