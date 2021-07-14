import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartURL = 'http://localhost:3000/api/cart';
  items = [];
  addToCart(product) {
    this.items.push(product);
  }
  getItems() {
    return this.items;
  }
  clearCart() {
    return this.items;
  }
  constructor(private http: HttpClient) {}
  cartDetail(cart) {
    return this.http.post<any>(this.cartURL, cart);
      }
  getAllCarts() {
    return this.http.get<any>(this.cartURL);
  }
}
