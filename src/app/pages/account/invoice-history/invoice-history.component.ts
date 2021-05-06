import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {
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

}
