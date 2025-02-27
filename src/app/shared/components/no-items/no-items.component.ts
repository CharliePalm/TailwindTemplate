import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-items.component.html'
})
export class NoItemsComponent {
  @Input() title?: string;
  @Input() displayContactReroute = true;
  constructor(
    public router: Router,
  ) {}
}
