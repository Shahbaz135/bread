import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestySliderComponent } from './testy-slider.component';

describe('TestySliderComponent', () => {
  let component: TestySliderComponent;
  let fixture: ComponentFixture<TestySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
