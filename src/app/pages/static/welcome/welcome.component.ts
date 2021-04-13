import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/common/auth.service';
import { PartnerService } from 'src/app/services/partner/partner.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public userInfo: any = {};
  public partnerInfo: any = {};

  constructor(
    private partnerService: PartnerService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService
  ) { }

  ngOnInit(): void {
    this.userInfo = AuthService.getLoggedUser().data;

    //// getting partner
    this.getPartner(+this.userInfo.partnerId);
  }

  getPartner(id): void {
    this.partnerService.getPartnerById(id)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.spinner.hide();
          this.partnerInfo = response.data;
        }
      }, error => {
        this.spinner.hide();
        this.toasterService.warning(error.error.message[0].message);
      });
  }

   ///// to display image
  // tslint:disable-next-line: typedef
  absPath(file) {
    return environment.fileBaseUrl + file;
  }

}
