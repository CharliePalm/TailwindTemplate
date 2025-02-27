import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() value!: string | boolean | number;
  @Input() label!: string;
  @Input() selected!: boolean;
  @Input() mode: 'simple' | 'fancy' = 'simple';
}