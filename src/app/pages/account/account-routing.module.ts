import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdditionalOrderComponent } from './additional-order/additional-order.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { BillsComponent } from './bills/bills.component';
import { ChangeOneTimeListComponent } from './change-one-time-list/change-one-time-list.component';
import { ChangeOrderComponent } from './change-order/change-order.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeRecurringListComponent } from './change-recurring-list/change-recurring-list.component';
import { ContactComponent } from './contact/contact.component';
import { CreateBreakComponent } from './create-break/create-break.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { CreditsComponent } from './credits/credits.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { OneTimeChangeComponent } from './one-time-change/one-time-change.component';
import { OneTimeComponent } from './one-time/one-time.component';
import { OrderBreakageComponent } from './order-breakage/order-breakage.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PaymentsComponent } from './payments/payments.component';
import { PersonalDetailComponent } from './personal-detail/personal-detail.component';
import { RecurringChangeComponent } from './recurring-change/recurring-change.component';
import { RecurringComponent } from './recurring/recurring.component';

const routes: Routes = [
  { path: ``,
   redirectTo: `create-order`
  },
  { path: `create-order`,
   component: CreateOrderComponent
  },
  { path: `additional-order`,
   component: AdditionalOrderComponent
  },
  { path: `contact`,
   component: ContactComponent
  },
  { path: `change-order`,
   component: ChangeOrderComponent
  },
  { path: `bills`,
   component: BillsComponent
  },
  { path: `billing-address`,
   component: BillingAddressComponent
  },
  { path: `invoice-history`,
   component: InvoiceHistoryComponent
  },
  { path: `order-breakage`,
   component: OrderBreakageComponent
  },
  { path: `change-password`,
   component: ChangePasswordComponent
  },
  { path: `payment`,
   component: PaymentsComponent
  },
  { path: `credits`,
   component: CreditsComponent
  },
  { path: `personal-detail`,
   component: PersonalDetailComponent
  },
  { path: `order-history`,
   component: OrderHistoryComponent
  },
  { path: `delivery-address`,
   component: DeliveryAddressComponent
  },
  { path: `one-time`,
   component: OneTimeComponent
  },
  { path: `recurring`,
   component: RecurringComponent
  },
  { path: `one-time-change/:id`,
   component: OneTimeChangeComponent
  },
  { path: `recurring-change/:id`,
   component: RecurringChangeComponent
  },
  { path: `change-one-time-list`,
   component: ChangeOneTimeListComponent
  },
  { path: `change-recurring-list`,
   component: ChangeRecurringListComponent
  },
  { path: `create-breakage`,
   component: CreateBreakComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
