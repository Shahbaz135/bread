import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBreakComponent } from './create-break.component';

describe('CreateBreakComponent', () => {
  let component: CreateBreakComponent;
  let fixture: ComponentFixture<CreateBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
