import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-checkbox-group',
  standalone: true,
  templateUrl: './checkbox-group.component.html',
  imports: [CommonModule, CheckboxComponent, LabelComponent],
})
export class CheckboxGroupComponent {
  @Input() group!: FormGroup;
  options!: {control: AbstractControl, label: string }[];
  ngOnInit(): void {
    if (!this.group) {
      throw Error('an abstract control is required for radio group');
    }
    if (!(this.group instanceof FormGroup)) {
      throw Error('checkbox group requires a formGroup');
    }
    this.options = Object.keys(this.group.controls).map((key) => ({ control: this.group.controls[key], label: key}));
  }
}
