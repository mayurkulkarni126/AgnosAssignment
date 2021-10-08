import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboInfoModalComponent } from './combo-info-modal.component';

describe('ComboInfoModalComponent', () => {
  let component: ComboInfoModalComponent;
  let fixture: ComponentFixture<ComboInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
