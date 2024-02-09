import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.model';
import { environment } from 'src/environments/environment';
import { ShoppingCartsService } from '../services/shopping-carts.service';
import { OrdersService } from '../services/orders.service';
import { Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { add, remove } from './shopping-cart.actions';
import { selectShoppingCart, selectShoppingCartPrice } from './shopping-cart.selectors';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, DoCheck, OnDestroy { // Fixed class implementation by changing OnDoCheck to DoCheck
  basket: Product[] = [];
  basketSubscr: Subscription;
  totalPriceSubscr: Subscription;
  public totalPrice: number = 0;
  public staticPath = environment.staticPath;
  constructor(
    private route: ActivatedRoute, 
    private shoppingCartsService: ShoppingCartsService, 
    private ordersService: OrdersService, 
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.basket = data['basketInfo'].basket;
      this.totalPrice = data['basketInfo'].price
    })

  }

  ngDoCheck() {
   this.basketSubscr = this.store.select(selectShoppingCart).subscribe(basket => this.basket = basket)
   this.totalPriceSubscr = this.store.select(selectShoppingCartPrice).subscribe(totalPrice => this.totalPrice = totalPrice)
  }

  addUnits(item: Product) {
    const updatedProduct = { ...item };
    updatedProduct.quantity++;
    this.store.dispatch(add({item: updatedProduct}))
  }

  removeUnits(item: Product) {
    const updatedProduct = { ...item };
    updatedProduct.quantity--;
    this.store.dispatch(remove({item: updatedProduct}))
  }

  checkout() {
    this.ordersService.createOrder(this.basket).pipe(take(1)).subscribe({
      next: (order) => {
        this.shoppingCartsService.emptyTheBasket()
        this.router.navigate(['/orders', order.id])
      },
      error: () => {
        this.router.navigate(['/auth'], {queryParams: {mode: 'login', message: 'checkout'}})
      }
    })
  }

  ngOnDestroy(): void {
    this.basketSubscr.unsubscribe();
  }

}

