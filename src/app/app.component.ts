import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartsService } from './services/shopping-carts.service';
import { Product } from './product/product.model';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectShoppingCartLength } from './shopping-cart/shopping-cart.selectors';
import { loadProducts } from './product/product.actions';
import { callAutoLogin, callLogout } from './auth/auth.actions';
import { selectAuth } from './auth/auth.selectors';
import { ProductState } from './product/product.reducer';
import { AuthState } from './auth/auth.reducer';

export type AppStoreState = {
  shoppingCart: Product[],
  catalogue: ProductState,
  auth: AuthState
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  authSubscr: Subscription;
  // shoppingCart: Product[] = [];
  // cartQuantity: number = 0;
  cartQuantity$: Observable<number>;
  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService, private store: Store<AppStoreState>) {}
  

  ngOnInit(): void {

    this.store.dispatch(loadProducts());
  
    this.cartQuantity$ = this.store.select(selectShoppingCartLength)

    this.authSubscr = this.store.select(selectAuth).subscribe({
      next:(auth) => {
        this.isLoggedIn = auth.isLoggedIn;
      },
      error: (error) => {
        throw new Error(error)
      }
    })

    this.store.dispatch(callAutoLogin())

  }

  logoutUser() {
    // this.authService.logout();
    this.store.dispatch(callLogout())
  }

  ngOnDestroy(): void {
    this.authSubscr.unsubscribe();
    
  }
  
}
