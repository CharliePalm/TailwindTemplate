import { Component, Input } from '@angular/core';
import { IconType } from '../../model';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  standalone: false,
})
export class IconComponent {
  @Input() type!: IconType;
  @Input() clickable = true;
  IconType = IconType;
}
