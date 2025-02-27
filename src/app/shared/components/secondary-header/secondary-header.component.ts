import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-secondary-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './secondary-header.component.html'
})
export class SecondaryHeaderComponent {
  @Input() title!: string;
  constructor(public router: Router) {}
}
