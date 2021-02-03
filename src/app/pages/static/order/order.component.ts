import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public active = 1;

  public product1Value = 0;
  public product2Value = 0;
  public product3Value = 0;
  public product4Value = 0;
  public product5Value = 0;
  public product6Value = 0;
  public product7Value = 0;
  public product8Value = 0;
  public product9Value = 0;
  public closeResult: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  pop1(days) {
    this.modalService.open(days, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  pop2(delet) {
    this.modalService.open(delet, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  toggleMore(value): void {
    if ( value == 1) {
      this.product1Value++;
    }

    if ( value == 2) {
      this.product2Value++;
    }

    if ( value == 3) {
      this.product3Value++;
    }

    if ( value == 4) {
      this.product4Value++;
    }

    if ( value == 5) {
      this.product5Value++;
    }

    if ( value == 6) {
      this.product6Value++;
    }
    if ( value == 7) {
      this.product7Value++;
    }
    if ( value == 8) {
      this.product8Value++;
    }
    if ( value == 9) {
      this.product9Value++;
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
    if (value == 3) {
      if (this.product3Value > 0) {
        this.product3Value--;
      }
    }
    if (value == 4) {
      if (this.product4Value > 0) {
        this.product4Value--;
      }
    }
    if (value == 5) {
      if (this.product5Value > 0) {
        this.product5Value--;
      }
    }

    if (value == 6) {
      if (this.product6Value > 0) {
        this.product6Value--;
      }
    }
    if (value == 7) {
      if (this.product7Value > 0) {
        this.product7Value--;
      }
    }
    if (value == 8) {
      if (this.product8Value > 0) {
        this.product8Value--;
      }
    }
    if (value == 9) {
      if (this.product9Value > 0) {
        this.product9Value--;
      }
    }
  }

}
