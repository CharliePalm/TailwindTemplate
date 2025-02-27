import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { TextBoxType } from '../../model';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  standalone: false,
})
export class TextboxComponent {
  @Input() readonly = false;
  @Input() control!: string;
  @Input() type: TextBoxType = TextBoxType.None;
  @Input() size: 'rg' | 'lg' = 'rg';
  @Input() labelClass = '';
  constructor() { }
}
