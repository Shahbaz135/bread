import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringChangeComponent } from './recurring-change.component';

describe('RecurringChangeComponent', () => {
  let component: RecurringChangeComponent;
  let fixture: ComponentFixture<RecurringChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
