import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { PartnerService } from `../../../services/partner/partner.service`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class RegisterComponent implements OnInit {
  public RegistrationForm: FormGroup;
  public active = 1;

  public product1Value = 0;
  public product2Value = 0;
  public product3Value = 0;
  public product4Value = 0;
  public product5Value = 0;
  public product6Value = 0;
  public product7Value = 0;
  public product8Value = 0;
  public product9Value = 0;
  public closeResult: any;
  public showDiv = 1;
  public newregister: FormGroup;

  private partnerId: number = 123;
  private postalCode: number;


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
    private modalService: NgbModal
    // private partnerService: PartnerService
  ) {
    // tslint:disable-next-line: deprecation
    this.activatedRoute.params.subscribe(params => {
      if (params[`code`]) {
        this.postalCode = + params[`code`];
      }
    });
  }

  ngOnInit(): void {
    this.renderForm();

    //// get partner by postal code

  }

  //// initializing form
  renderForm(): void {
    this.RegistrationForm = this.formBuilder.group({
      desiredDate: [''],
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
      partnerId: ['123', [Validators.required]],
      termCondition: [false],
      sendOffer: [false]
    });
  }

  nextDiv(): void {
    if ( this.showDiv !== 4) {
      ///// checking div number
      if (this.showDiv === 1) {
        if (!this.partnerId ) {
          return;
        }
      }
      // if (this.showDiv === 2) {
      //   const desiredDate = this.RegistrationForm.value.desiredDate;
      //   if (!desiredDate || desiredDate === ``) {
      //     this.RegistrationForm.controls.desiredDate.markAllAsTouched();
      //     this.toasterService.info(`Please fill all required filed`, `Incomplete Form`);
      //     return;
      //   }
      // }

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


  toggleMore(value): void {
    if ( value == 1) {
      this.product1Value++;
    }

    if ( value == 2) {
      this.product2Value++;
    }

    if ( value == 3) {
      this.product3Value++;
    }

    if ( value == 4) {
      this.product4Value++;
    }

    if ( value == 5) {
      this.product5Value++;
    }

    if ( value == 6) {
      this.product6Value++;
    }
    if ( value == 7) {
      this.product7Value++;
    }
    if ( value == 8) {
      this.product8Value++;
    }
    if ( value == 9) {
      this.product9Value++;
    }
  }

  toggleLess(value): void {
    if (value == 1) {
      if (this.product1Value > 0) {
        this.product1Value--;
      }
    }

    if (value == 2) {
      if (this.product2Value > 0) {
        this.product2Value--;
      }
    }
    if (value == 3) {
      if (this.product3Value > 0) {
        this.product3Value--;
      }
    }
    if (value == 4) {
      if (this.product4Value > 0) {
        this.product4Value--;
      }
    }
    if (value == 5) {
      if (this.product5Value > 0) {
        this.product5Value--;
      }
    }

    if (value == 6) {
      if (this.product6Value > 0) {
        this.product6Value--;
      }
    }
    if (value == 7) {
      if (this.product7Value > 0) {
        this.product7Value--;
      }
    }
    if (value == 8) {
      if (this.product8Value > 0) {
        this.product8Value--;
      }
    }
    if (value == 9) {
      if (this.product9Value > 0) {
        this.product9Value--;
      }
    }
  }


}
