import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { HeadBannerComponent } from './head-banner/head-banner.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';


@NgModule({
  declarations: [CreateOrderComponent, HeadBannerComponent, AccountMenuComponent],
  imports: [
    CommonModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
