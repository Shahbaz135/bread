import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailOrderComponent } from './trail-order.component';

describe('TrailOrderComponent', () => {
  let component: TrailOrderComponent;
  let fixture: ComponentFixture<TrailOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
