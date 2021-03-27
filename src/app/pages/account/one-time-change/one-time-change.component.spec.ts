import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneTimeChangeComponent } from './one-time-change.component';

describe('OneTimeChangeComponent', () => {
  let component: OneTimeChangeComponent;
  let fixture: ComponentFixture<OneTimeChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneTimeChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimeChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
