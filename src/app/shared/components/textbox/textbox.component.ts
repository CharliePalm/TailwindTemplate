import { Component, Input } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TextBoxType } from '../../model';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';
import { ErrorsComponent } from '../errors/errors.component';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LabelComponent, ErrorsComponent],
})
export class TextboxComponent {
  @Input() readonly = false;
  @Input() control!: FormControl | AbstractControl;
  @Input() type: TextBoxType = TextBoxType.None;
  @Input() size: 'rg' | 'lg' = 'rg';
  @Input() labelClass = '';
  @Input() useErrors = true;
  isFocused = false;
  constructor() { }
}
