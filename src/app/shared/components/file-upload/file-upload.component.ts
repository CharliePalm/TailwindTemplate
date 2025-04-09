import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'src/app/shared/service/toast.service';
import { AbstractControl, ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class FileUploadComponent implements OnInit {
  file?: File;
  fileName?: string;
  isDragging = false;
  src?: string;
  @Input() displayUploadButton: boolean = false;
  @Input() control!: AbstractControl<any> | null; // need form control to set value on change
  @Input() accept: string = 'image/*, video/*';
  @Input() existingFilePath?: string;
  @Output() fileSelected = new EventEmitter<File>();

  constructor(
    // private http: HttpClient, todo
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.fileName = this.control?.value;
    this.src = this.existingFilePath;
  }

  // Handle drag over event
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  // Handle drag leave event
  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  // Handle file drop event
  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer?.files.length) {
      this.file = event.dataTransfer.files[0];
      this.control?.setValue(this.file.name);
    }
  }

  // Handle file selection via input
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
      this.fileName = this.file.name;
      this.src = URL.createObjectURL(this.file);
      this.control?.setValue(this.file.name);
      this.fileSelected.emit(this.file);
    }
  }

  clearSelection(): void {
    this.file = undefined;
    this.fileName = undefined;
    this.control?.setValue(undefined);
  }

  // Upload file using pre-signed URL
  async uploadFile() {
    if (!this.file) return;
    try {
      // Request a pre-signed URL from the backend
      const presignedUrl = 'iurl'; // TODO
      // Upload the file to S3
      // await this.http.put(presignedUrl, this.file, { headers: { 'Content-Type': this.file.type } }).toPromise();
      this.toastService.show('successfully uploaded file');
    } catch (error) {
      this.toastService.show('failed to upload file');
    }
  }
}
