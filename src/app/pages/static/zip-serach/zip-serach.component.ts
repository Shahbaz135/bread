import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PartnerService } from 'src/app/services/partner/partner.service';

@Component({
  selector: 'app-zip-serach',
  templateUrl: './zip-serach.component.html',
  styleUrls: ['./zip-serach.component.css']
})
export class ZipSerachComponent implements OnInit {
  public postalCode: number;

  constructor(
    private toasterService: ToastrService,
    private partnerService: PartnerService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line: typedef
  searchPartner() {
    this.spinner.show();
    if (!this.postalCode || this.getLength(this.postalCode) !== 5) {
      this.toasterService.warning(`Please enter valid postal code`, `invalid`);
      this.spinner.hide();
      return;
    }

    this.partnerService.getPartnerByPostalCode(this.postalCode)
    .subscribe(response => {
      this.spinner.hide();
      if (response.status === `Success`) {
        this.router.navigate(['/register'], { queryParams: { code: this.postalCode} });
      }
    }, error => {
      this.spinner.hide();
      this.toasterService.warning(error.error.message[0].message);
    });
  }

  getLength(num): number {
    if (num) {
      return num.toString().length;
    }
}

}
