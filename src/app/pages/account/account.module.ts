import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateOrderComponent } from './create-order/create-order.component';
import { AdditionalOrderComponent } from './additional-order/additional-order.component';
import { ContactComponent } from './contact/contact.component';
import { ChangeOrderComponent } from './change-order/change-order.component';
import { BillsComponent } from './bills/bills.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { OrderBreakageComponent } from './order-breakage/order-breakage.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PaymentsComponent } from './payments/payments.component';
import { CreditsComponent } from './credits/credits.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { OneTimeComponent } from './one-time/one-time.component';
import { RecurringComponent } from './recurring/recurring.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OneTimeChangeComponent } from './one-time-change/one-time-change.component';
import { RecurringChangeComponent } from './recurring-change/recurring-change.component';
import { ChangeOneTimeListComponent } from './change-one-time-list/change-one-time-list.component';
import { ChangeRecurringListComponent } from './change-recurring-list/change-recurring-list.component';
import { CreateBreakComponent } from './create-break/create-break.component';


@NgModule({
  declarations: [CreateOrderComponent, AdditionalOrderComponent, ContactComponent, ChangeOrderComponent, BillsComponent, BillingAddressComponent, InvoiceHistoryComponent, OrderBreakageComponent, ChangePasswordComponent, PaymentsComponent, CreditsComponent, PersonalDetailComponent, OrderHistoryComponent, DeliveryAddressComponent, OneTimeComponent, RecurringComponent, OneTimeChangeComponent, RecurringChangeComponent, ChangeOneTimeListComponent, ChangeRecurringListComponent, CreateBreakComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class AccountModule { }
