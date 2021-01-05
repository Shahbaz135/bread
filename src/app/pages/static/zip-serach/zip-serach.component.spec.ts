import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipSerachComponent } from './zip-serach.component';

describe('ZipSerachComponent', () => {
  let component: ZipSerachComponent;
  let fixture: ComponentFixture<ZipSerachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipSerachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipSerachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
