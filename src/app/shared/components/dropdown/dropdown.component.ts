import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormControl, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { IconType } from '../../model';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from '../errors/errors.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ErrorsComponent, IconComponent],
  templateUrl: './dropdown.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DropdownComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() options!: string[] | { [key: string]: string };
  @Input() labelClass = '';
  @Input() readonly = false;
  IconType = IconType;
  formattedOptions: { [key: string]: string } = {};
  keys!: string[];
  active = false;

  ngOnInit(): void {
    if (Array.isArray(this.options)) {
      this.options.forEach((option) => this.formattedOptions[option] = option);
      this.keys = this.options;
    } else {
      this.formattedOptions = this.options;
      this.keys = Object.keys(this.options);
    }
  }

  updateValue(option: string, inp: HTMLInputElement) {
    inp.value = this.formattedOptions[option];
    this.active = !this.active;
    inp.dispatchEvent(new Event('input'));
  }
}
