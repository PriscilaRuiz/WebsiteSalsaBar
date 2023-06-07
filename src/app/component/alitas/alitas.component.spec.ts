import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlitasComponent } from './alitas.component';

describe('AlitasComponent', () => {
  let component: AlitasComponent;
  let fixture: ComponentFixture<AlitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlitasComponent]
    });
    fixture = TestBed.createComponent(AlitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
