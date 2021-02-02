import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AccountLayoutComponent } from './layouts/account-layout/account-layout.component';
import { HeadBannerComponent } from './pages/account/head-banner/head-banner.component';
import { AccountMenuComponent } from './pages/account/account-menu/account-menu.component';
import { BillsComponent } from './bills/bills.component';

import { AuthService } from './services/common/auth.service';
// import { } from `./services/partner/partner.service`

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    FooterComponent,
    AccountLayoutComponent,
    HeadBannerComponent,
    AccountMenuComponent,
    BillsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
