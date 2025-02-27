import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dropdown.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class DropdownComponent implements OnInit {
  @Input() control!: string;
  @Input() options!: string[] | { [key: string]: string };
  @Input() labelClass = '';
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
