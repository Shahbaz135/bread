import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOrderComponent } from './additional-order.component';

describe('AdditionalOrderComponent', () => {
  let component: AdditionalOrderComponent;
  let fixture: ComponentFixture<AdditionalOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
