import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartService } from '../cart/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.css']
})
export class OrderpageComponent implements OnInit, OnDestroy {
  carts: any[] = [];
  unsubscribe: Subject<any> = new Subject<any>();

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCarts();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadCarts(): void {
    this.cartService
      .getAllCarts()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        res => (this.carts = res),
        err => console.log(`err: `, err)
      );
  }

  getCartTotal(items: any[]): number {
    const total = items.reduce(
      (t, { amt, qnt }) => (t += Number(amt * qnt)),
      0
    );

    return total;
  }
}
