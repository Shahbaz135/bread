import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-breakage',
  templateUrl: './order-breakage.component.html',
  styleUrls: ['./order-breakage.component.css']
})
export class OrderBreakageComponent implements OnInit {
  userInfo: any = {};
  orderInterruptions = [];

  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const userData = AuthService.getLoggedUser();
    if (!userData) {
      this.toasterService.info(`You are not logged in`, `Warning`);
      this.router.navigateByUrl(`auth/login`);
    } else {
      this.userInfo = userData.data;
    }

    this.getAllInterruptions();
  }

  getAllInterruptions(): void {
    // console.log(finalOrder);
    const formData = {
      CustomerId: +this.userInfo.id,
    };

     //// calling api
    this.orderService.getOrderInterruptions(formData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.orderInterruptions = response.data;
        }
        }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.toasterService.warning(error.error.message[0].message, `Error`);
        } else {
          this.toasterService.warning(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

}
