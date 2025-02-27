import { Component, Input, OnInit } from '@angular/core';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  standalone: true,
  imports: [CommonModule, RadioButtonComponent, LabelComponent],
})
export class RadioGroupComponent implements OnInit {
  @Input() options!: { [key: string]: boolean | string | number };
  @Input() control!: AbstractControl;
  @Input() mode: 'simple' | 'fancy' = 'simple';
  public optionsArr!: { label: string; value: boolean | string | number }[];
  public selectedIndex!: number;
  ngOnInit(): void {
    this.optionsArr = Object.keys(this.options).map((v) => ({ label: v, value: this.options[v] }));
    if (!this.control) {
      throw Error('an abstract control is required for radio group');
    }
    this.selectedIndex = this.optionsArr.findIndex((option) => this.control.value === option.value);
  }

  getWrapperStyle(): object {
   return {
    '--tw-translate-x': (this.selectedIndex > 0 ? (this.selectedIndex + '00%') : '0%'),
    'width': (100 / this.optionsArr.length) + `%`,
    'z-index': '0',
   };
  }
}
