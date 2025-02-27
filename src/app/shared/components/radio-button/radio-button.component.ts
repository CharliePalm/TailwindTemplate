import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  imports: [CommonModule, LabelComponent],
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() value!: string | boolean | number;
  @Input() label!: string;
  @Input() selected!: boolean;
  @Input() mode: 'simple' | 'fancy' = 'simple';
}