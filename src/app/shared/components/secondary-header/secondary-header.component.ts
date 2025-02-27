import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-header',
  standalone: false,
  templateUrl: './secondary-header.component.html'
})
export class SecondaryHeaderComponent {
  @Input() title!: string;
  constructor(public router: Router) {}
}
