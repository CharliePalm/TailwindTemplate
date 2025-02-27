import { Component, EventEmitter, Host, HostListener, Input, OnInit, Output } from '@angular/core';
import { SidebarOption } from '../../model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SidebarComponent implements OnInit {
  @Output() optionSelected: EventEmitter<SidebarOption> = new EventEmitter<SidebarOption>();
  @Input() options: SidebarOption[] = Object.values(SidebarOption) as any as SidebarOption[];
  isMobile: boolean = false;
  expanded = false;

  ngOnInit(): void {
    this.windowSizeCheck();
  }

  toggleSidebar() {
    this.expanded = !this.expanded;
    document.body.classList.toggle('no-scroll', this.expanded && this.isMobile);
  }

  selected(option: SidebarOption) {
    this.toggleSidebar();
    this.optionSelected.emit(option);
  }

  @HostListener("window:resize", []) windowSizeCheck() {
    if (this.expanded) this.toggleSidebar();
    this.isMobile = window.outerWidth <= 850 || window.innerWidth <= 850;
  }
}
