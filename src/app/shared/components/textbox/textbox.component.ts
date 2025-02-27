import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { TextBoxType } from '../../model';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LabelComponent],
})
export class TextboxComponent {
  @Input() readonly = false;
  @Input() control!: string;
  @Input() type: TextBoxType = TextBoxType.None;
  @Input() size: 'rg' | 'lg' = 'rg';
  @Input() labelClass = '';
  constructor() { }
}
