import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { BreakfastComponent } from './breakfast/breakfast.component';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { FaqComponent } from './faq/faq.component';
import { FranchiesComponent } from './franchies/franchies.component';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { OrderComponent } from './order/order.component';
import { RegisterComponent } from './register/register.component';
import { ShowPopComponent } from './show-pop/show-pop.component';
import { TestySliderComponent } from './testy-slider/testy-slider.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'breakfast',
    component: BreakfastComponent
  },
  {
    path: 'franchies',
    component: FranchiesComponent
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent
  },
  {
    path: 'imprint',
    component: ImprintComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'order-review',
    component: OrderReviewComponent
  },
  {
    path: 'register/:code',
    component: RegisterComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'testy',
    component:TestySliderComponent
  },
  {
    path:'order',
    component:OrderComponent
  },
  {
    path:'',
    component:ShowPopComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule { }
