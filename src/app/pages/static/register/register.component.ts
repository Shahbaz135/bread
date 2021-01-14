import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public showDiv = 1;

  

  constructor() { }

  ngOnInit(): void {
    
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
