import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent {
  @Input() size?: string = 'w-20 h-20'; // Default size (Tailwind utility classes)
}
