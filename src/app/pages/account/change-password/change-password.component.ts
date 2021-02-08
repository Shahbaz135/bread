import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public currentValidPassword = false;

  constructor(
    private toastService: ToastrService,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
  }

}
