import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PartnerService } from '../../../services/partner/partner.service';
import { CustomerService } from '../../../services/customer/customer.service';
import { CategoryService } from '../../../services/category/category.service';
import { OrderService } from '../../../services/order/order.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/common/auth.service';

@Component({
  selector: 'app-trail-order',
  templateUrl: './trail-order.component.html',
  styleUrls: ['./trail-order.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class TrailOrderComponent implements OnInit {
  public RegistrationForm: FormGroup;
  public active = 0;

  public closeResult: any;
  public showDiv = 1;
  public newregister: FormGroup;

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
    private categoryService: CategoryService,
    private orderService: OrderService
  ) {
   }

   ngOnInit(): void {

    this.renderForm();

    const userData = AuthService.getLoggedUser();
    this.userInfo = userData.data;

    this.spinner.show();
    this.getPartner(+this.userInfo.partnerId);
  }

  //// initializing form
  renderForm(): void {
    this.RegistrationForm = this.formBuilder.group({
      desiredDate: ['', [Validators.required]],
      fName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      lName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      salutation: ['', [Validators.required]],
      email: ['', [Validators.required , Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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
      partnerPostalCode: [''],
      termCondition: [true],
      sendOffer: [true],
      isTrail: [false],
      isWeb: [true]
    });
  }

  populateForm(): void {
    this.RegistrationForm.patchValue(this.userInfo);

    this.rf.email.disable();
    this.rf.phone.disable();
    this.rf.birthDay.disable();
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
        this.getCategories(+this.userInfo.partnerId);
      }
      if (this.showDiv === 2) {
        this.maintainProducts();

        this.populateForm();
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

  maintainProducts(): void {
    this.orderOverview = [];
    this.tempDaysWithProduct.forEach(days => {
      const dayId = days.id;
      const day = days.day;
      const obj = { dayId: ``, day: ``, product: []};
      days.categoryDays.forEach(category => {
        const temp = category.Products.filter(product => {
          return product.quantity > 0;
        });
        if (temp.length) {
          obj.dayId = dayId;
          obj.day = day;
          obj.product.push(temp);
        }
      });
      if (obj.product.length) {
        this.orderOverview.push(obj);
      }
    });
  }

  getCategories(partnerId): void {
    this.isChanged = false;
    this.spinner.show();
    const data = {
      postCode: this.userInfo.postalCode
    };

    this.categoryService.getCategories(data)
      .subscribe(response => {
        this.spinner.hide();
        this.tempDaysWithProduct = response.data;
        this.categoryProducts = response.data[0].categoryDays;
        this.isChanged = true;
        this.activeDay = `Monday`;

        ///// adding quantity
        this.tempDaysWithProduct.forEach(element => {
          this.addQuantityToProduct(element.categoryDays);
        });
        // this.addQuantityToProduct(this.categoryProducts);
        // console.log(this.categoryProducts);
      }, error => {
        this.spinner.hide();
        this.isChanged = true;
        console.log(error);
      });
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

        if (!this.tempDaysWithProduct.length) {
          this.getCategories(+this.userInfo.partnerId);
        }
      }
      if (value === 3) {
        if (!this.partnerId ) {
          return;
        }

        this.populateForm();
        this.maintainProducts();
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
    this.categoryProducts = day.categoryDays;

    setTimeout(() => {
      this.spinner.hide();
      this.isChanged = true;
    }, 500);
  }

  addQuantityToProduct(categories): void {
    for (const category of categories) {
      for (const product of category.Products) {
        if (!product.quantity) {
          product.quantity = 0;
        }
      }
    }
  }

  getPartner(id): void {
    this.partnerService.getPartnerById(id)
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

  ///// to create new order
  // tslint:disable-next-line: typedef
  createOrder() {
    this.spinner.show();
    if (!this.orderOverview.length) {
      this.spinner.hide();
      this.toasterService.info(`You did not select any product`, `Info`);
      return;
    }

    const finalOrder = [];
    this.orderOverview.forEach(days => {
      const dayId = days.dayId;
      const obj: any = {};
      days.product.forEach(product => {
        product.forEach(element => {
          obj.product = element.name;
          obj.WeekDaysId = dayId;
          obj.quantity = element.quantity;
          obj.price = element.productPrice;

          finalOrder.push(obj);
        });
      });
    });

    const formData = {
      overAllPrice: this.overAllProductPrice,
      isOneTime: false,
      isTrail: true,
      validFrom: this.rf.desiredDate.value,
      partnerId: +this.userInfo.partnerId,
      customerId: +this.userInfo.id,
      order: finalOrder
    };

    //// calling api
    this.orderService.createOrder(formData)
      .subscribe(response => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.toasterService.success(response.message, response.status);
          // this.RegistrationForm.reset();
          this.router.navigateByUrl(`home`);
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
    this.overAllProductPrice = +this.overAllProductPrice.toFixed(2);
  }

  subtractProduct(product): void {
    if (product.quantity > 0) {
      product.quantity -= 1;
      this.overAllProductPrice -= product.productPrice;
    }
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

}
