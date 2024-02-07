import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product/product.model';
import { environment } from 'src/environments/environment';
import { ShoppingCartsService } from '../services/shopping-carts.service';
import { OrdersService } from '../services/orders.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, DoCheck { // Fixed class implementation by changing OnDoCheck to DoCheck
  basket: Product[] = [];
  public totalPrice: number = 0;
  public staticPath = environment.staticPath;
  constructor(
    private route: ActivatedRoute, 
    private shoppingCartsService: ShoppingCartsService, 
    private ordersService: OrdersService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.basket = data['basket'];
      for (const basketItem of this.basket) {
        this.totalPrice += +(basketItem.price * basketItem.quantity).toFixed(2)
      }
    })

  }

  ngDoCheck() {
    this.shoppingCartsService.shoppingCartSubjetc.subscribe((updatedBasket) =>{ 
      this.totalPrice = 0;
      for (const basketItem of updatedBasket) {
        this.totalPrice += +(basketItem.price * basketItem.quantity)
      }
      this.totalPrice = parseFloat(this.totalPrice.toFixed(2))
    })
  }

  addUnits(item: Product) {
    const updatedProduct = { ...item };
    updatedProduct.quantity++;
    this.shoppingCartsService.updateTemporaryItem(updatedProduct);
  }

  removeUnits(item: Product) {
    const updatedProduct = { ...item };
    updatedProduct.quantity--;
    this.shoppingCartsService.updateTemporaryItem(updatedProduct);
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

}

