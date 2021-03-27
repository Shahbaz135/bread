import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-create-break',
  templateUrl: './create-break.component.html',
  styleUrls: ['./create-break.component.css']
})
export class CreateBreakComponent implements OnInit {
  validFrom: Date;
  expiryDate: Date;

  userInfo: any = {};

  constructor(
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    const userData = AuthService.getLoggedUser();
    if (!userData) {
      this.toasterService.info(`You are not logged in`, `Warning`);
      this.router.navigateByUrl(`auth/login`);
    } else {
      this.userInfo = userData.data;
    }
  }

  createInterruption(): void {
    this.spinner.show();
    if (!this.validFrom || !this.expiryDate) {
      this.toasterService.warning(`Error`, `Please Select valid from and expiry dates`);
      this.spinner.hide();
      return;
    }

    // console.log(finalOrder);
    const formData = {
      validFrom: this.validFrom,
      expiryDate: this.expiryDate,
      partnerId: +this.userInfo.partnerId,
      customerId: +this.userInfo.id,
    };

     //// calling api
    this.orderService.createOrderInterruption(formData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.toasterService.success(response.message, response.status);
          // this.RegistrationForm.reset();
          this.router.navigateByUrl(`account/order-breakage`);
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
