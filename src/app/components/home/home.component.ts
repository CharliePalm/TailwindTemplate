import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CheckboxComponent } from "../../shared/components/checkbox/checkbox.component";
import { DatePickerComponent } from "../../shared/components/date-picker/date-picker.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from "../../shared/components/dropdown/dropdown.component";
import { IconType } from '../../shared/model';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { RadioGroupComponent } from '../../shared/components/radio-group/radio-group.component';
import { TextboxComponent } from '../../shared/components/textbox/textbox.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ToastService } from '../../shared/service/toast.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { CheckboxGroupComponent } from 'src/app/shared/components/checkbox-group/checkbox-group.component';
import { DragAndDropComponent } from 'src/app/shared/components/drag-and-drop/drag-drop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ButtonComponent,
    CheckboxComponent,
    DatePickerComponent,
    CommonModule,
    ReactiveFormsModule,
    DropdownComponent,
    IconComponent,
    LoaderComponent,
    ModalComponent,
    RadioGroupComponent,
    HeaderComponent,
    TextboxComponent,
    ToastComponent,
    CheckboxGroupComponent,
    DragAndDropComponent,
  ],
  standalone: true,
})
export class HomeComponent {
  form = this.formBuilder.group({
    '1': [undefined],
    '2': [undefined],
    '3': [undefined],
    '4': [undefined],
    '5': [undefined],
    '6': [undefined],
    '7': [undefined],
    '8': [undefined],
    '9': [undefined],
    '10': [undefined],
    '11': this.formBuilder.group({
      'option 1': false,
      'option 2': true,
      'option 3': false,
    }),
    '12': [undefined],
  });
  IconType = Object.keys(IconType);
  constructor(
    private formBuilder: FormBuilder,
    public toastService: ToastService,
  ) { }
}
