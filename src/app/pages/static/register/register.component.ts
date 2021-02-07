import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PartnerService } from '../../../services/partner/partner.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { CategoryService } from '../../../services/category/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class RegisterComponent implements OnInit {
  public RegistrationForm: FormGroup;
  public active = 0;

  public closeResult: any;
  public showDiv = 1;

  private partnerId: number;
  public partnerInfo: any = {};

  private userInfo: any = {};
  public categoryProducts = [];

  public tempDaysWithProduct = [];
  public activeDay: any;
  public isChanged = false;

  public orderOverview = [];

  public overAllProductPrice = 0;


  // function for matching of password and confirm password.
  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: 'no' };
    };
 }

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toasterService: ToastrService,
    private modalService: NgbModal,
    private partnerService: PartnerService,
    private customerService: CustomerService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService
  ) {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.queryParams.subscribe(params => {
      if (params[`code`]) {
        this.spinner.show();
        const code = + params[`code`];
        this.getPartner(code);
      }
    });
  }

  ngOnInit(): void {
    this.renderForm();

    const userData = AuthService.getLoggedUser();
    this.userInfo = userData.data;

    //// get partner by postal code

  }

  //// initializing form
  renderForm(): void {
    this.RegistrationForm = this.formBuilder.group({
      desiredDate: ['', [Validators.required]],
      fName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      salutation: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email, Validators.maxLength(100)]],
      confirmEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100), RegisterComponent.matchValues('email')]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), RegisterComponent.matchValues('password')]],
      postalCode: ['', []],
      town: ['', []],
      houseStreetNumber: ['', [Validators.required]],
      differentAddress: [''],
      company: [``],
      birthDay: [``, [Validators.required]],
      partyInHouse: [``],
      deliverNotes: [``],
      recommendationOf: [``],
      partnerId: ['', [Validators.required]],
      partnerPostalCode: ['', [Validators.required,  Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(5)]],
      termCondition: [false],
      sendOffer: [false],
      isTrail: [true],
      isWeb: [true]
    });
  }

  nextDiv(): void {
    if ( this.showDiv !== 4) {
      ///// checking div number
      if (this.showDiv === 1) {
        if (!this.partnerId ) {
          this.toasterService.info(`Please fill all required filed`, `Incomplete Form`);
          return;
        }

        this.spinner.show();

        this.categoryService.getCategories(this.userInfo.partnerId)
          .subscribe(response => {
            this.spinner.hide();
            this.tempDaysWithProduct = response.data;
            this.categoryProducts = response.data[0].categories;
            this.isChanged = true;
            this.activeDay = `MON`;

            ///// adding quantity
            this.tempDaysWithProduct.forEach(element => {
              this.addQuantityToProduct(element.categories);
            });
            // this.addQuantityToProduct(this.categoryProducts);
            // console.log(this.categoryProducts);
          }, error => {
            this.spinner.hide();
            console.log(error);
          });

      }
      if (this.showDiv === 2) {
        // this.tempDaysWithProduct.forEach(days => {
        //   const day = days.day;
        //   const obj = { day: ``, product: []};
        //   days.categories.forEach(category => {
        //     const temp = category.relatedProducts.filter(product => {
        //       return product.quantity > 0;
        //     });
        //     if (temp.length) {
        //       obj.day = day;
        //       obj.product.push(temp);
        //     }
        //   });
        //   if (obj.product.length) {
        //     this.orderOverview.push(obj);
        //   }
        // });

        const desiredDate = this.RegistrationForm.value.desiredDate;
        if (!desiredDate || desiredDate === ``) {
          this.RegistrationForm.controls.desiredDate.markAllAsTouched();
          this.toasterService.info(`Please fill all required filed`, `Incomplete Form`);
          return;
        }
      }

      if (this.showDiv === 3) {
        if (this.RegistrationForm.invalid) {
          this.RegistrationForm.markAllAsTouched();
          this.toasterService.info(`Please fill all required filed`, `Incomplete Form`);
          return;
        }
      }
      this.showDiv += 1;
    }
  }

  previousDiv(): void {
    if (this.showDiv !== 1) {
      this.showDiv -= 1;
    }
  }

  specificDiv(value): void {
    if (value) {
      if (value === 2) {
        if (!this.partnerId ) {
          return;
        }
      }
      if (value === 3) {
        if (!this.partnerId ) {
          return;
        }
        const desiredDate = this.RegistrationForm.value.desiredDate;
        if (!desiredDate || desiredDate === ``) {
          this.RegistrationForm.controls.desiredDate.markAllAsTouched();
          return;
        }
      }

      if (value === 4) {
        if (this.RegistrationForm.invalid) {
          this.RegistrationForm.markAllAsTouched();
          return;
        }
      }
      this.showDiv = value;
    }
  }

  // tslint:disable-next-line: typedef
  selectedDay(day) {
    this.spinner.show();
    this.isChanged = false;
    this.activeDay = day.day;
    this.categoryProducts = day.categories;

    setTimeout(() => {
      this.spinner.hide();
      this.isChanged = true;
    }, 500);
  }

  addQuantityToProduct(categories): void {
    for (const category of categories) {
      for (const product of category.relatedProducts) {
        product.quantity = 0;
      }
    }
  }

  ///// find partner
  checkPartner(): void {
    //// validating input
    this.spinner.show();
    if (!this.rf.partnerPostalCode.value || this.rf.partnerPostalCode.invalid ) {
      this.rf.partnerPostalCode.markAllAsTouched();
      this.spinner.hide();
      return;
    }

    //// calling api
    const code = + this.rf.partnerPostalCode.value;
    this.getPartner(code);
  }

  getPartner(code): void {
    this.partnerService.getPartnerByPostalCode(code)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.spinner.hide();
          this.partnerInfo = response.data;
          this.partnerId = this.partnerInfo.id;
          this.rf.partnerId.setValue(this.partnerId);
        }
      }, error => {
        this.spinner.hide();
        this.toasterService.warning(error.error.message[0].message);
      });
  }

  ///// submit registration form here
  // tslint:disable-next-line: typedef
  registerCustomer() {
    this.spinner.show();
    if (this.RegistrationForm.invalid) {
      this.RegistrationForm.markAllAsTouched();
      this.toasterService.info(`Please fill all required filed`, `Incomplete Form`);
      this.spinner.hide();
      return;
    }

    const formData = this.RegistrationForm.value;
    this.customerService.registerCustomer(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.toasterService.success(response.message, response.status);
          this.RegistrationForm.reset();
          this.router.navigateByUrl(`auth/login`);
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


  ///// to display image
  // tslint:disable-next-line: typedef
  absPath(file) {
    return environment.fileBaseUrl + file;
  }

  // tslint:disable-next-line: typedef
  addProduct(product) {
    product.quantity += 1;
    this.overAllProductPrice += product.productPrice;
  }

  subtractProduct(product): void {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.overAllProductPrice -= product.productPrice;
    }
  }

  // convenience getter for easy access to registration form fields
  // tslint:disable-next-line: typedef
  get rf() {
    return this.RegistrationForm.controls;
  }


  ///////// ************ validation of form *********** ///////////
    // rf error messages
  // tslint:disable-next-line: typedef
  desiredDate() {
    return this.rf.desiredDate.hasError('required') ? 'Date is required' :
              '';
  }

  // tslint:disable-next-line: typedef
  partnerPostalCodeError() {
    return this.rf.partnerPostalCode.hasError('required') ? 'Please Enter Postal Code' :
        this.rf.partnerPostalCode.hasError('minlength') ? 'Please Enter Valid Postal Code' :
          this.rf.partnerPostalCode.hasError('maxlength') ? 'Please Enter Valid Postal Code' :
          this.rf.partnerPostalCode.hasError('pattern') ? 'Please Enter Valid Postal Code' :
              '';
  }

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
  salutationError() {
    return this.rf.salutation.hasError('required') ? 'Salutation is required' :
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
  confirmEmailError() {
    return this.rf.confirmEmail.hasError('required') ? 'Confirm email is required' :
        this.rf.confirmEmail.hasError('email') ? 'Not a valid email.' :
          this.rf.confirmEmail.hasError('maxlength') ? 'Email cannot exceed 100 characters' :
              this.rf.confirmEmail.hasError('isMatching') && this.rf.confirmEmail.touched ? 'Confirm email does not match' :
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
  passwordError() {
    return this.rf.password.hasError('required') ? 'Password is required' :
      this.rf.password.hasError('minlength') ? 'Password is required of minimum 6 characters' :
        this.rf.password.hasError('maxlength') ? 'Password cannot exceed 16 characters' :
            '';
  }

   // tslint:disable-next-line: typedef
  confirmPasswordError() {
    return this.rf.confirmPassword.hasError('required') ? 'Confirm password is required' :
        this.rf.confirmPassword.hasError('minlength') ? 'Confirm password is required of minimum 6 characters' :
          this.rf.confirmPassword.hasError('maxlength') ? 'Confirm password cannot exceed 16 characters' :
              this.rf.confirmPassword.hasError('isMatching') && this.rf.confirmPassword.touched ? 'Confirm password does not match' :
                '';
  }

  // tslint:disable-next-line: typedef
  birthdayError() {
    return this.rf.birthDay.hasError('required') ? 'Please select birthday' :
      '';
  }

  // tslint:disable-next-line: typedef
  houseStreetNumberError() {
    return this.rf.houseStreetNumber.hasError('required') ? 'Please enter house Street Number or Road name' :
      '';
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
}
