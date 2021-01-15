import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaticRoutingModule } from './static-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LatestPostComponent } from './latest-post/latest-post.component';
import { ZipSerachComponent } from './zip-serach/zip-serach.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { FranchiesComponent } from './franchies/franchies.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { ImprintComponent } from './imprint/imprint.component';
import { FaqComponent } from './faq/faq.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { TestySliderComponent } from './testy-slider/testy-slider.component';
import { RegisterComponent } from './register/register.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [HomeComponent, AboutUsComponent, LatestPostComponent, ZipSerachComponent, BreakfastComponent, FranchiesComponent, DataProtectionComponent, ImprintComponent, FaqComponent, OrderReviewComponent, TestySliderComponent, RegisterComponent, OrderComponent],
  imports: [
    CommonModule,
    StaticRoutingModule
  ]
})
export class StaticModule { }
