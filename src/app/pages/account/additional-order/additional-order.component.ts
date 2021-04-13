import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category/category.service';
import { AuthService } from 'src/app/services/common/auth.service';
import { OrderService } from 'src/app/services/order/order.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-additional-order',
  templateUrl: './additional-order.component.html',
  styleUrls: ['./additional-order.component.css']
})
export class AdditionalOrderComponent implements OnInit {
  userInfo: any;

  categoryProductData = [];
  allDays = [];

  totalPrice = 0;
  deliveryDate: Date;

  createOrder = false;
  showExistingOrders = false;

  allAdditionalOrders = [];


  constructor(
    private categoryService: CategoryService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private orderService: OrderService
  ) {
  }

  ngOnInit(): void {
    const userData = AuthService.getLoggedUser();
    if (!userData) {
      this.toasterService.info(`You are not logged in`, `Warning`);
      this.router.navigateByUrl(`auth/login`);
    } else {
      this.userInfo = userData.data;
      // this.getCategoryProducts();
    }
  }

  onNewOrder(): void {
    this.createOrder = true;
    this.showExistingOrders = false;
  }

  onShowExisting(): void {
    this.createOrder = false;
    this.showExistingOrders = true;

    this.getAdditionalOrders();
  }

  dateChange(): void {
    let day = new Date(this.deliveryDate).getDay();
    if (day === 0) {
      day = 7;
    }

    if (day) {
      this.getCategoryProducts(day);
    }
  }

  getCategoryProducts(day): void {
    this.spinner.show();
    const data = {
      postCode: this.userInfo.postalCode,
      dayId: day
    };

    this.categoryService.getCategoriesRegular(data)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.spinner.hide();
          this.categoryProductData = response.data.categoryDays;
          this.allDays = response.data.allDays;

          /// adding field
          this.addQuantityField();
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
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
      }

    } else {
      if (index > -1) {
        const price = product.selectedProducts[index].quantity * product.productPrice;
        this.totalPrice -= price;
        product.selectedProducts.splice(index, 1);
      }
    }
  }


  // tslint:disable-next-line: typedef
  submitOrder() {
    this.spinner.show();
    if (!this.deliveryDate) {
      this.spinner.hide();
      this.toasterService.warning(`Please Select Date`, `Delivery Date`);
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
      deliveryDate: this.deliveryDate,
      partnerId: +this.userInfo.partnerId,
      customerId: +this.userInfo.id,
      order: finalOrder
    };

     //// calling api
    this.orderService.createAdditionalOrder(formData)
     .subscribe(response => {
       this.spinner.hide();
       if (response.status === `Success`) {
         this.toasterService.success(response.message, response.status);
         // this.RegistrationForm.reset();
         this.emptyForm();
         this.router.navigateByUrl(`account/additional-order`);
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

  emptyForm(): void {
    const field: any = document.getElementsByClassName(`quantity`);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < field.length; i++) {
      field[i].value = null;
    }

    this.totalPrice = 0;
    this.addQuantityField();
  }

  getAdditionalOrders(): void {
    this.spinner.show();
    const data = {
      partnerId: +this.userInfo.partnerId,
      customerId: +this.userInfo.postalCode
    };

    this.orderService.getAdditionalOrders(data)
      .subscribe(response => {
        if (response.status === `Success`) {
          this.spinner.hide();
          this.allAdditionalOrders = response.data;
        }
      }, error => {
        console.log(error);
        this.spinner.hide();
        this.toasterService.error(`Something went wrong`, `Error`);
      });
  }
}
