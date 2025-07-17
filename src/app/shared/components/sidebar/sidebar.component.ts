import { Component } from '@angular/core';
import { SidebarOption } from '../../model';
import { Router, RouterModule } from '@angular/router';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class SidebarComponent {
  expanded = false;
  options = Object.keys(SidebarOption);
  toggleSidebar = () => {
    this.expanded = !this.expanded;
    // timer(100).subscribe(() =>
    //   document.getElementById("body")?.classList.toggle("bg-[#4d3e28]"),
    // );
  };

  constructor(private router: Router) {}
  public get selectedPage(): SidebarOption | '' {
    return this.router.url.slice(1) as SidebarOption | '';
  }
}
