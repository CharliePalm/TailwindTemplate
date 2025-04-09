import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { map, timer } from 'rxjs';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errors.component.html',
})
export class ErrorsComponent implements OnInit {
  @Input() control!: FormControl | FormGroup;
  @Input() checkTouched: boolean = true;
  ngOnInit(): void {
    this.control.valueChanges.subscribe(() => {
      this.parseErrors(this.control.errors);
    });
  }

  keys: string[] = [];
  display = false;
  errorMap = new Map<string, ['inactive' | 'active', boolean]>();

  async parseErrors(errors: ValidationErrors | null): Promise<void> {
    const errorKeys = Object.keys(errors || {});
    const errorValues = Object.values(errors || {});
    const existingKeys = this.errorMap.keys();
    let next = existingKeys.next();
    while (!next.done) {
      if (!errorValues.includes(next.value!)) {
        this.errorMap.set(next.value, ['inactive', false]);
      }
      next = existingKeys.next();
    }
    for (let key of errorKeys) {
      const val = key == 'required' ? 'This field is required' : errors![key];
      this.errorMap.set(val, ['inactive', true]);
    }
    this.keys = Array.from(this.errorMap.keys());
  }

  setTimer(val: string) {
    timer(200).pipe(map((_) => val)).subscribe((v) => this.errorMap.get(val)![1] ? this.errorMap.set(v, ['active', true]) : undefined);
  }
}
