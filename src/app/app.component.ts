import { Component, OnInit } from '@angular/core';
import { ShoppingCartsService } from './services/shopping-carts.service';
import { Product } from './product/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  shoppingCart: Product[] = [];
  cartQuantity: number = 0;
  
  constructor(private shoppingCartsService: ShoppingCartsService) {}

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartsService.fetchShoppingCart();

    this.shoppingCartsService.shoppingCartSubjetc.subscribe((cart: Product[]) => {
      this.shoppingCart = cart;
      this.cartQuantity = this.shoppingCart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    });
  }
  
}
