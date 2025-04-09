import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { IconType } from '../../model';
import { APIService } from 'src/app/shared/service/api.service';
import { BehaviorSubject } from 'rxjs';
import { Store } from 'src/app/shared/service/store';
import { ToastService } from 'src/app/shared/service/toast.service';

@Component({
  selector: 'app-data-grid',
  standalone: true,
  templateUrl: './data-grid.component.html'
})
export class DataGridComponent<T extends { id: string, title: string }> {
  @ViewChild('confirmationModal', { static: true }) confModal!: ModalComponent;
  @Input() deletable: boolean = true;
  @Input() entryDeletable: (data: T) => boolean = () => true;
  @Input() editable: boolean = true;
  @Input() addable: boolean = true;
  @Input() data!: T[];
  @Input() dataSubtitle?: (data: T) => string | undefined;
  @Output() addNew = new EventEmitter<void>();
  @Output() open = new EventEmitter<T>();

  IconType = IconType;

  selectedData?: T;
  submitSubject = new BehaviorSubject(1);
  submitSubject$ = this.submitSubject.asObservable();

  constructor(
    private apiService: APIService,
    private clientDataStore: Store,
    private toastService: ToastService,
  ) {}

  openAreYouSureModal(event: T, clickEvent: Event): void {
    this.selectedData = event;
    clickEvent.stopPropagation();
    this.confModal.open();
  }

  deleteEvent(): void {
    this.submitSubject.next(-1);
    this.apiService.deleteEvent(this.selectedData!.id).subscribe(
      (v) => {
        if (v) {
          this.toastService.show('Successfully deleted event');
          this.confModal.toggle();
          this.submitSubject.next(1);
          this.clientDataStore.refresh();
        }
      }
    );
  }

  public hasSubtitle(o: T): o is T & { subtitle: string } {
    return 'subtitle' in o;
  }
}
