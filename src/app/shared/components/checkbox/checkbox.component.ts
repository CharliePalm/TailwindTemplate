import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  imports: [ReactiveFormsModule, IconComponent, CommonModule],
})
export class CheckboxComponent {
  @Input() control!: AbstractControl | FormControl;
  constructor() { }
}
