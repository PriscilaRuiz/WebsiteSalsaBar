import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalchisComponent } from './salchis.component';

describe('SalchisComponent', () => {
  let component: SalchisComponent;
  let fixture: ComponentFixture<SalchisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalchisComponent]
    });
    fixture = TestBed.createComponent(SalchisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
