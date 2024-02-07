import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartsService } from './services/shopping-carts.service';
import { Product } from './product/product.model';
import { AuthComponent } from './auth/auth/auth.component';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  authSubscr: Subscription;
  shoppingCart: Product[] = [];
  cartQuantity: number = 0;
  isLoggedIn: boolean = false;
  
  constructor(private shoppingCartsService: ShoppingCartsService, private authService: AuthService) {}
  

  ngOnInit(): void {
    this.shoppingCart = this.shoppingCartsService.fetchShoppingCart();

    this.shoppingCartsService.shoppingCartSubjetc.subscribe((cart: Product[]) => {
      this.shoppingCart = cart;
      this.cartQuantity = this.shoppingCart.reduce((total, cartItem) => total + cartItem.quantity, 0)
    });

    this.authSubscr = this.authService.isLoggedIn.subscribe(isLoggedIn => {this.isLoggedIn = isLoggedIn;});

    this.authService.autoLogin()
  }

  logoutUser() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscr.unsubscribe();
  }
  
}
