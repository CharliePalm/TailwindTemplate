import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CheckboxComponent } from "../shared/components/checkbox/checkbox.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ButtonComponent, CheckboxComponent],
  standalone: true,
})
export class HomeComponent {
  constructor() { }
}
