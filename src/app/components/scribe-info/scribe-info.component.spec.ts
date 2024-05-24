import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScribeInfoComponent } from './scribe-info.component';

describe('ScribeInfoComponent', () => {
  let component: ScribeInfoComponent;
  let fixture: ComponentFixture<ScribeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScribeInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScribeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
