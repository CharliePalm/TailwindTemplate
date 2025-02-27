import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: false,
})
export class ModalComponent {
  @Input() title: string = '';      // Optional modal title
  @Input() isOpen: boolean = false;   // Control modal visibility
  @Output() onClose = new EventEmitter<void>();

  // Closes the modal by emitting the close event
  close() {
    this.onClose.emit();
    this.isOpen = false;
  }

  open() {
    this.isOpen = true;
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  // Clicking the overlay closes the modal.
  // Stop propagation on the modal container to prevent immediate closure.
  onOverlayClicked(event: MouseEvent) {
    this.close();
  }
}
