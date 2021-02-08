import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.component.html',
  styleUrls: ['./delivery-address.component.css']
})
export class DeliveryAddressComponent implements OnInit {
  CustomerForm: FormGroup;
  public id: number;

  constructor(
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.renderForm();

    const userInfo = AuthService.getLoggedUser().data;
    this.id = +userInfo.id;
    this.getCustomerById(this.id);
    // this.populateForm(userInfo);
  }

  //// initializing form
  renderForm(): void {
    this.CustomerForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required , Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      postalCode: ['', []],
      town: ['', []],
      houseStreetNumber: ['', [Validators.required]],
      deliverNotes: [``],
    });
  }

  populateForm(data): void {
    if (data) {
      console.log(data);
      this.CustomerForm.patchValue(data);
      this.spinner.hide();
    }
  }

  ///// get customer by id
  getCustomerById(id): void {
    this.spinner.show();

    this.customerService.getCustomerById(id)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.populateForm(response.data);
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
  updateCustomer() {
    this.spinner.show();
    if (this.CustomerForm.invalid) {
      this.CustomerForm.markAllAsTouched();
      this.spinner.hide();
      return;
    }

    const formData = this.CustomerForm.value;

    this.customerService.updateCustomer(this.id, formData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.toastService.success(response.message, response.status);
          this.getCustomerById(this.id);
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

  // convenience getter for easy access to registration form fields
  // tslint:disable-next-line: typedef
  get rf() {
    return this.CustomerForm.controls;
  }


  ///////// ************ validation of form *********** ///////////

  // tslint:disable-next-line: typedef
  fNameError() {
    return this.rf.fName.hasError('required') ? 'First Name is required' :
        this.rf.fName.hasError('minlength') ? 'First Name contain at least 2 characters' :
          this.rf.fName.hasError('maxlength') ? 'First Name cannot exceed 100 characters' :
              '';
  }

  // tslint:disable-next-line: typedef
  lNameError() {
    return this.rf.lName.hasError('required') ? 'Surname is required' :
        this.rf.lName.hasError('minlength') ? 'Name must contain at least 2 characters' :
          this.rf.lName.hasError('maxlength') ? 'Name cannot exceed 100 characters' :
              '';
  }

  // tslint:disable-next-line: typedef
  emailError() {
    return this.rf.email.hasError('required') ? 'Email is required' :
        this.rf.email.hasError('email') ? 'Not a valid email.' :
          this.rf.email.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
              '';
  }

  // tslint:disable-next-line: typedef
  phoneError() {
    return this.rf.phone.hasError('required') ? 'Phone number is required' :
      this.rf.phone.hasError('maxlength') ? 'Length of Phone number must be 11' :
        this.rf.phone.hasError('minlength') ? 'Length of Phone number must be 11' :
            '';
  }


  // tslint:disable-next-line: typedef
  houseStreetNumberError() {
    return this.rf.houseStreetNumber.hasError('required') ? 'Please enter house Street Number or Road name' :
      '';
  }

}
