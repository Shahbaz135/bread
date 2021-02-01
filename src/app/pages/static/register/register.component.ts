import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class RegisterComponent implements OnInit {
  public showDiv = 1;
  public newregister: FormGroup;

  

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.newregister = this.fb.group({
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    })
  }

  nextDiv(): void {
    if ( this.showDiv !== 4) {
      this.showDiv += 1;
    }
  }

  previousDiv(): void {
    if (this.showDiv !== 1) {
      this.showDiv -= 1;
    }
  }

  specificDiv(value): void {
    if (value) {
      this.showDiv = value;
    }
  }


  
}
