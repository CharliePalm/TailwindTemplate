import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drag-drop',
  standalone: true,
  templateUrl: './drag-drop.component.html',
  imports: [CommonModule, DragDropModule],
})
export class DragAndDropComponent implements OnInit {
  @Input() control!: AbstractControl;
  @Input() options: string[] = [];

  availableOptions: string[] = [];
  selectedOptions: string[] = [];

  ngOnInit(): void {
    if (!this.control || !(this.control instanceof FormControl)) {
      throw new Error('DragDropInputComponent requires a Formcontrol');
    }
    this.availableOptions = [...this.options];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer.id === event.container.id) return;

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.control.setValue(this.selectedOptions);
  }
}
