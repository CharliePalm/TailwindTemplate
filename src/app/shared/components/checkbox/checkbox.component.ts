import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  imports: [ReactiveFormsModule, LabelComponent],
})
export class CheckboxComponent implements OnInit {
  @Input() control!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
