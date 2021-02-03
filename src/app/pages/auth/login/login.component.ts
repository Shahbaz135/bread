import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public LogInForm: FormGroup;

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
  ) { }

  ngOnInit(): void {
    this.LogInForm = this.formBuilder.group({ 
      phone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
     });
  }

  get rf() {
    return this.LogInForm.controls;
  }
  
  

  

}
