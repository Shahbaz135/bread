import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  public orderHistory = [];

  constructor(
    private orderService: OrderService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    ///// getting looged user info
    const userInfo = AuthService.getLoggedUser().data;

    this.spinner.show();
    this.orderService.getOrders(userInfo.id)
      .subscribe(response => {
        this.spinner.hide();
        console.log(response);
        if (response.status === `Success`) {
          this.orderHistory = response.data;
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
