import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LoaderComponent {
  @Input() size?: 'sm' | 'md' | 'lg' | 'xl' = 'sm'; // Default size (Tailwind utility classes)
  @Input() loading = true;
}
