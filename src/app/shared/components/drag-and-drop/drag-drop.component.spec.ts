import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropComponent } from './drag-drop.component';

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragAndDropComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
