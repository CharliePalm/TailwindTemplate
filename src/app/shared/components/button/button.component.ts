import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() type: 'submit' | 'back' | 'text' | 'password' = 'submit';
  constructor() { }
}
