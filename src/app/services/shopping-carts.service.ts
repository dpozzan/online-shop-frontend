import { Injectable } from '@angular/core';
import { Product } from '../product/product.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shopping-cart/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartsService {
  private shoppingCart: Product[] = [];
  public shoppingCartSubjetc = new BehaviorSubject<Product[]>(this.shoppingCart)


  constructor(private http: HttpClient) { }

  saveTemporaryItem(product: Product): Promise<void> {
    return new Promise((resolve) => {
      let existingProduct = this.shoppingCart.find((cartItem) => cartItem.id === product.id)
      if(existingProduct){
        let existingProductIndex = this.shoppingCart.findIndex((cartItem) => cartItem.id === product.id)
        let updatedProduct = {...existingProduct, quantity: existingProduct.quantity + product.quantity}
        this.shoppingCart[existingProductIndex] = updatedProduct;
      } else {
        this.shoppingCart = [...this.shoppingCart, product];
      }
      this.shoppingCartSubjetc.next(this.shoppingCart);
      resolve();
    })
  }

  updateTemporaryItem(product: Product) {
    let productIndex = this.shoppingCart.findIndex((cartItem) => cartItem.id === product.id);
    if(product.quantity === 0){
      this.shoppingCart.splice(productIndex, 1);
    } else {
      this.shoppingCart[productIndex] = product;
    }
    this.shoppingCartSubjetc.next(this.shoppingCart);
  }

  fetchShoppingCart(): Product[] {

    this.shoppingCartSubjetc.next(this.shoppingCart)
    return this.shoppingCart
  }

  emptyTheBasket() {
    this.shoppingCartSubjetc.next([])
  }

}
