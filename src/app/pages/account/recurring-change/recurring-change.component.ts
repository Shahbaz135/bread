import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-recurring-change',
  templateUrl: './recurring-change.component.html',
  styleUrls: ['./recurring-change.component.css']
})
export class RecurringChangeComponent implements OnInit {
  userInfo: any;
  orderId: number;

  orderData: any = {};

  categoryProductData = [];
  allDays = [];

  totalPrice = 0;
  validFrom: Date;

  minDate: Date;

  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.minDate = new Date();
    this.route.params.subscribe(params => {
      this.orderId = params[`id`];
    });
  }

  ngOnInit(): void {
    const userData = AuthService.getLoggedUser();
    if (!userData) {
      this.toasterService.info(`You are not logged in`, `Warning`);
      this.router.navigateByUrl(`auth/login`);
    } else {
      this.userInfo = userData.data;
      this.getCategoryProducts();
    }
  }

   //// get current order details
   getOrderDetails(): void {
    const data = {
      id: this.orderId,
      isOneTime: false
    };

    this.orderService.getOrderById(data)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.orderData = response.data;
          this.setOrderData();
          // this.categoryProductData = response.data.categoryDays;
          // this.allDays = response.data.allDays;

        }
      }, error => {
        console.log(error);
        this.toasterService.error(`Something went wrong`, `Error`);
      });
  }

  setOrderData(): void {
    this.validFrom = this.orderData.validFrom;
    this.totalPrice = this.orderData.overAllPrice;

    this.populateFields();
  }

  populateFields(): void {
    const selectedOrders = this.orderData.OrderDetail;

    for (const product of selectedOrders) {
      const productName = product.product;
      const dayId = product.OrderDay.id;
      const day = product.OrderDay.day;
      const quantity = product.quantity;

      //// iterating through all categories & products
      for (const category of this.categoryProductData) {
        const foundProduct = category.Products.find(x => x.name === productName);
        if (foundProduct) {
          const foundDay = foundProduct.availableDays.find(x => x.id === dayId);

          if (foundDay) {
            foundDay.quantity = quantity;

            /// adding to selected products
            const obj = {
              id: dayId,
              quantity,
              day
            };

            foundProduct.selectedProducts.push(obj);
          }
        }
      }
    }
  }

  getCategoryProducts(): void {
    const data = {
      postCode: this.userInfo.postalCode
    };

    this.categoryService.getCategoriesRegular(data)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.categoryProductData = response.data.categoryDays;
          this.allDays = response.data.allDays;

          /// adding field
          this.addQuantityField();
          this.getOrderDetails();
        }
      }, error => {
        console.log(error);
        this.toasterService.error(`Something went wrong`, `Error`);
      });
  }

  addQuantityField(): void {
    this.categoryProductData.forEach(category => {
      category.Products.forEach(product => {
        product.selectedProducts = [];
      });
    });
  }

  onAddQuantity(product, event, pday): void {
    const index = product.selectedProducts.findIndex(x => x.id === pday.id);
    const value = +event.target.value;

    if (value && value > 0) {
      const obj = {
        id: pday.id,
        quantity: value,
        day: pday.day
      };

      if (index === -1) {
        product.selectedProducts.push(obj);
        this.totalPrice += product.productPrice * value;
      } else {
        // console.log(product.selectedProducts[index]);
        const price = product.selectedProducts[index].quantity * product.productPrice;
        this.totalPrice -= price;

        //// adding new price
        this.totalPrice += product.productPrice * value;
        product.selectedProducts[index] = obj;

        // this.totalPrice = +this.totalPrice.toFixed(3);
      }

    } else {
      if (index > -1) {
        const price = product.selectedProducts[index].quantity * product.productPrice;
        this.totalPrice -= price;
        product.selectedProducts.splice(index, 1);
      }
    }
  }

  emptyForm(): void {
    const field: any = document.getElementsByClassName(`quantity`);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < field.length; i++) {
      field[i].value = null;
    }

    this.totalPrice = 0;
    this.addQuantityField();
  }

  // tslint:disable-next-line: typedef
  submitOrder() {
    this.spinner.show();
    if (!this.validFrom) {
      this.spinner.hide();
      this.toasterService.warning(`Please Select Date`, `Valid From`);
      return;
    }

    if (this.totalPrice === 0) {
      this.spinner.hide();
      this.toasterService.warning(`Please Enter Order First`, `Warning`);
      return;
    }

    const finalOrder = [];
    this.categoryProductData.forEach(category => {
      category.Products.forEach(product => {
        const obj: any = {};
        if (product.selectedProducts.length > 0) {
          product.selectedProducts.forEach(selected => {
            obj.product = product.name;
            obj.WeekDaysId = selected.id;
            obj.quantity = selected.quantity;
            obj.price = product.productPrice;

            finalOrder.push({...obj});
          });
        }
      });
    });

    // console.log(finalOrder);
    const formData = {
      overAllPrice: this.totalPrice,
      isOneTime: false,
      isTrail: false,
      validFrom: this.validFrom,
      partnerId: +this.userInfo.partnerId,
      customerId: +this.userInfo.id,
      order: finalOrder
    };

     //// calling api
    this.orderService.changeOrder(formData, this.orderId)
     .subscribe(response => {
       this.spinner.hide();
       if (response.status === `Success`) {
         this.toasterService.success(response.message, response.status);
         // this.RegistrationForm.reset();
         this.router.navigateByUrl(`account/change-recurring-list`);
       }
      }, (error) => {
       this.spinner.hide();
       console.log(error);
       if (error.error) {
         this.toasterService.warning(error.error.message[0].message, `Error`);
       } else {
         this.toasterService.warning(`Something went wrong, Please try again`, `Error`);
       }
     });
  }

  ///// to display image
  // tslint:disable-next-line: typedef
  absPath(file) {
    return environment.fileBaseUrl + file;
  }

}
