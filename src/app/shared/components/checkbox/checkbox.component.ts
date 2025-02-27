import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
  imports: [ReactiveFormsModule],
})
export class CheckboxComponent implements OnInit {
  @Input() control!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
