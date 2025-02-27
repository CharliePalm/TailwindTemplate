import { Component, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { IconType } from '../../model';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { LabelComponent } from '../label/label.component';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent, LabelComponent],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class DatePickerComponent {
  @Input() initialDate: string | undefined = undefined;
  @Input() control!: string;
  @Input() minDate?: Date = new Date();
  @Output() dateChange = new EventEmitter<string>();

  IconType = IconType;

  isMinMonth: boolean = true;
  showCalendar: boolean = false;
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth(); // 0-indexed (0=January)
  days: number[] = [];
  selectedDate: Date | undefined = this.initialDate ? new Date(this.initialDate) : undefined;
  
  constructor(private eRef: ElementRef) {
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  generateCalendar(year: number, month: number) {
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.days = [];
    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.days.push(0);
    }
    // Add the days for the month
    for (let day = 1; day <= daysInMonth; day++) {
      this.days.push(day);
    }
  }

  selectDate(day: number) {
    if (day === 0 || (this.isMinMonth && this.isLessThanMinDate(day))) return;
    this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
    this.dateChange.emit(this.selectedDate.toLocaleDateString());
    this.showCalendar = false;
  }

  toggleCalendar() {
    this.selectedDate = this.selectedDate ?? (this.initialDate ? new Date(this.initialDate) : undefined);
    this.showCalendar = !this.showCalendar;
  }

  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.isMinMonth = !!this.minDate && this.currentMonth === this.minDate.getMonth();
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  nextMonth() {
    this.isMinMonth = false;
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }

  isLessThanMinDate(day: number): boolean {
    return !!this.minDate && day < this.minDate.getDate();
  }

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }
}
