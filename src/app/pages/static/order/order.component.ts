import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public active = 1;

  public product1Value = 0;
  public product2Value = 0;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMore(value): void {
    if ( value == 1) {
      this.product1Value++;
    }

    if ( value == 2) {
      this.product2Value++;
    }
  }

  toggleLess(value): void {
    if (value == 1) {
      if (this.product1Value > 0) {
        this.product1Value--;
      }
    }

    if (value == 2) {
      if (this.product2Value > 0) {
        this.product2Value--;
      }
    }
  }

}
