import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';


@Component({
  selector: 'app-change-recurring-list',
  templateUrl: './change-recurring-list.component.html',
  styleUrls: ['./change-recurring-list.component.css']
})
export class ChangeRecurringListComponent implements OnInit {
  public orderHistory = [];
  userInfo: any = {};

  constructor(
    private orderService: OrderService,
    private toastService: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    ///// getting logged user info
    this.userInfo = AuthService.getLoggedUser().data;
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.spinner.show();
    const data = {
      CustomerId: this.userInfo.id,
      isOneTime: false
    };

    this.orderService.getOrders(data)
      .subscribe(response => {
        this.spinner.hide();
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

  onDelete(order): void {
    if (confirm(`Are you sure to end this order`)) {
      this.spinner.show();

      this.orderService.deleteOrder(order.id)
        .subscribe(response => {
          this.spinner.hide();
          if (response.status === `Success`) {
            this.toastService.success(`Success`, `This order successfully ended`);
            this.getAllOrders();
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
}
