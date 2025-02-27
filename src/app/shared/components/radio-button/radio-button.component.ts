import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  standalone: false,
  templateUrl: './radio-button.component.html'
})
export class RadioButtonComponent {
  @Input() value!: string | boolean | number;
  @Input() label!: string;
  @Input() selected!: boolean;
  @Input() mode: 'simple' | 'fancy' = 'simple';
}