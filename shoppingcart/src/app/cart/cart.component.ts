import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  getCartDetails: any[];
  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}
  total = 0;
  cartNumber = 0;
  items = this.cartService.getItems();
  checkoutForm = this.formBuilder.group({
    name: '',
    address: ''
  });
  cartDetail() {
    console.table(this.getCartDetails);
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    const payload = {
      address: this.checkoutForm.value,
      cart: this.getCartDetails
    };
    this.cartService.cartDetail(payload).subscribe(
      res => {
        this.checkoutForm.reset();
        this.removeall();
      },
      err => console.log(err)
    );
  }
  ngOnInit() {
    this.CartDetails();
    this.loadCart();
  }
  CartDetails() {
    // tslint:disable-next-line: align
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
    }
  }
  incQnt(prodId, qnt) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        // tslint:disable-next-line: triple-equals
        if (qnt != 5) {
          this.getCartDetails[i].qnt =
            // tslint:disable-next-line: radix
            parseInt(qnt) + 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }
  decQnt(prodId, qnt) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        // tslint:disable-next-line: triple-equals
        if (qnt != 1) {
          this.getCartDetails[i].qnt =
            // tslint:disable-next-line: radix
            parseInt(qnt) - 1;
        }
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      this.total = this.getCartDetails.reduce(
        // tslint:disable-next-line: only-arrow-functions
        function(acc, val) {
          return acc + val.amt * val.qnt;
        },
        0
      );
    }
  }
  removeall() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.auth.cartSubject.next(this.cartNumber);
  }
  singleDelete(getCartDetail) {
    console.log(getCartDetail);
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart'));
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].prodId === getCartDetail) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem(
            'localCart',
            JSON.stringify(this.getCartDetails)
          );
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }
  cartNumberFunc() {
    // tslint:disable-next-line: prefer-const
    let cartValue = JSON.parse(localStorage.getItem('localCart'));
    this.cartNumber = cartValue.length;
    this.auth.cartSubject.next(this.cartNumber);
  }
}
