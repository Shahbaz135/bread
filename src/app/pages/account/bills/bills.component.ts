import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/common/auth.service';
import {FileSaver} from 'file-saver';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  public invoiceHistory = [];

  constructor(
    private orderService: OrderService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    ///// getting logged user info
    const userInfo = AuthService.getLoggedUser().data;

    this.spinner.show();
    const data = {
      CustomerId: userInfo.id
    };

    this.orderService.getInvoices(data)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.invoiceHistory = response.data;
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        if (error.error) {
          this.toastService.warning(error.error.message[0].message, `Error`);
        } else {
          this.toastService.warning(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getPDF(invoice): void {
    this.spinner.show();
    const data = {
      id: invoice.id
    };

    this.orderService.getInvoicePDF(data);
    this.spinner.hide();

    // this.orderService.getInvoicePDF(data)
    //   .subscribe(response => {
    //     this.spinner.hide();
    //     console.log(`Success == `);
    //     console.log(response);
    //     FileSaver.saveAs(response.data);
    //   }, error => {
    //     console.log(error);
    //     this.spinner.hide();
    //     if (error.error) {
    //       this.toastService.warning(error.error.message[0].message, `Error`);
    //     } else {
    //       this.toastService.warning(`Something went wrong, Please try again`, `Error`);
    //     }
    //   });
  }
}
