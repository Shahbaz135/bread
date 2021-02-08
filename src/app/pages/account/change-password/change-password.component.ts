import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public currentValidPassword = false;
  private id: number;

  public currentPassword = ``;
  public newPassword = ``;
  public confirmNewPassword = ``;

  constructor(
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    if (AuthService.getLoggedUser()) {
      this.id = AuthService.getLoggedUser().data.id;
    }
  }

  // tslint:disable-next-line: typedef
  validatePassword() {
    this.currentValidPassword = false;
    this.spinner.show();
    if (!this.currentPassword || this.currentPassword === ``) {
      this.spinner.hide();
      this.toastService.info(`Please enter your current password`, `Error`);
      return;
    }

    const fromData = {
      id: this.id,
      password: this.currentPassword
    };

    this.customerService.validatePassword(fromData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.currentValidPassword = true;
          // this.toastService.success(response.message, response.status);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.toastService.warning(error.error.message[0].message, `Error`);
        } else {
          this.toastService.warning(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  // tslint:disable-next-line: typedef
  changePassword() {
    this.spinner.show();
    if (!this.newPassword || this.newPassword === `` || !this.confirmNewPassword|| this.confirmNewPassword === ``
    || this.newPassword !== this.confirmNewPassword) {
      this.spinner.hide();
      this.toastService.info(`Invalid inputs or password do not match`, `Error`);
      return;
    }

    const fromData = {
      id: this.id,
      password: this.newPassword
    };

    this.customerService.changePassword(fromData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.toastService.success(response.message, response.status);
          this.currentValidPassword = false;
          this.currentPassword = ``;
          this.newPassword = ``;
          this.confirmNewPassword = ``;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.toastService.warning(error.error.message[0].message, `Error`);
        } else {
          this.toastService.warning(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

}
