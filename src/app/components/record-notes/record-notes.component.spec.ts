import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordNotesComponent } from './record-notes.component';

describe('RecordNotesComponent', () => {
  let component: RecordNotesComponent;
  let fixture: ComponentFixture<RecordNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
