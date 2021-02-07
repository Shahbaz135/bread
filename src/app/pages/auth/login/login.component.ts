import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public logInForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService: ToastrService,
    private customerService: CustomerService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [Validators.required]],
     });
  }

  // tslint:disable-next-line: typedef
  get lf() {
    return this.logInForm.controls;
  }

  // tslint:disable-next-line: typedef
  customerLogin() {
    this.spinner.show();
    if (this.logInForm.invalid) {
      this.logInForm.markAllAsTouched();
      this.spinner.hide();
      return;
    }

    const formData = this.logInForm.value;
    this.customerService.customerLogin(formData)
      .subscribe((response) => {
        if (response.status === `Success`) {
          this.spinner.hide();
          AuthService.setLoggedUser(response.data.tokenInfo);
          this.toasterService.success(response.message, response.status);
          this.router.navigateByUrl(`account`);
        }
      }, (error) => {
        console.log(error);
        this.spinner.hide();
        if (error.error) {
          this.toasterService.warning(error.error.message[0].message, `Invalid`);
        } else {
          this.toasterService.warning(`Something went wrong! Please try again`, `Invalid`);
        }
      });
  }


  /////////// ******* Validating and displaying errors ******** //////

  // tslint:disable-next-line: typedef
  phoneError() {
    return this.lf.phone.hasError('required') ? 'Phone number is required' :
      this.lf.phone.hasError('maxlength') ? 'Invalid Phone number' :
        this.lf.phone.hasError('minlength') ? 'Invalid Phone number' :
            '';
  }

  // tslint:disable-next-line: typedef
  passwordError() {
    return this.lf.password.hasError('required') ? 'Password is required' :
      '';
  }
}
