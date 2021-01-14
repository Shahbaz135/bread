import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderBreakageComponent } from './order-breakage.component';

describe('OrderBreakageComponent', () => {
  let component: OrderBreakageComponent;
  let fixture: ComponentFixture<OrderBreakageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderBreakageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderBreakageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
