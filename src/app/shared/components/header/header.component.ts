import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription, take, timer } from 'rxjs';
import { SidebarOption } from '../../model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() selectedOption: string | undefined;
  @Input() bringTheBeatIn!: boolean;
  isOpen = false;
  options = Object.keys(SidebarOption);
  optionActive?: boolean[];
  subscription?: Subscription;

  constructor(public router: Router) {}
  isSelected = (option: string): boolean => option === this.selectedOption;
  toggleMenu() {
    if (!this.isOpen) {
      this.optionActive = this.options.map((_) => false);
      timer(100).subscribe(() => {
        this.isOpen = !this.isOpen;
        document.body.style.overflow = 'hidden'; // Disable scrolling
        this.subscription = interval(100).pipe(take(this.options.length)).subscribe((count: number) => this.optionActive ? this.optionActive[count] = true : null);
      });
    } else {
      this.isOpen = !this.isOpen;
      document.body.style.overflow = ''; // Re-enable scrolling
      this.subscription?.unsubscribe();
    }
  }
}
