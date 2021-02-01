import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPopComponent } from './show-pop.component';

describe('ShowPopComponent', () => {
  let component: ShowPopComponent;
  let fixture: ComponentFixture<ShowPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
