import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRecurringListComponent } from './change-recurring-list.component';

describe('ChangeRecurringListComponent', () => {
  let component: ChangeRecurringListComponent;
  let fixture: ComponentFixture<ChangeRecurringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeRecurringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRecurringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
