import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeOneTimeListComponent } from './change-one-time-list.component';

describe('ChangeOneTimeListComponent', () => {
  let component: ChangeOneTimeListComponent;
  let fixture: ComponentFixture<ChangeOneTimeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeOneTimeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeOneTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
