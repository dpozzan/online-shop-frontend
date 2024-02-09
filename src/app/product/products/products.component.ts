import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';
import { Store } from '@ngrx/store';
import { selectShoppingCart } from 'src/app/shopping-cart/shopping-cart.selectors';
import { add } from 'src/app/shopping-cart/shopping-cart.actions';
import { Observable } from 'rxjs';
import { selectProducts } from '../product.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  public tempQuantities: { [productId: number]: number } = {};
  products$: Observable<Product[]>
  public staticPath = environment.staticPath;

  constructor(private store: Store) {}

  ngOnInit() {
    this.products$ = this.store.select(selectProducts)
  }

  decreaseQuantity(product: Product) {
    const currentQuantity = this.tempQuantities[product.id] || product.quantity;
    if (currentQuantity > 1) {
      this.tempQuantities[product.id] = currentQuantity - 1;
    }
  }

  increaseQuantity(product: Product) {
    const currentQuantity = this.tempQuantities[product.id] || product.quantity;
    if (currentQuantity < 99) {
      this.tempQuantities[product.id] = currentQuantity + 1;
    }
  }
  
  async addToCart(product: Product) {
    const currentQuantity = this.tempQuantities[product.id] || product.quantity;
    const productToItem = {...product, quantity: currentQuantity}
    this.store.dispatch(add({item: productToItem}))
    this.tempQuantities[product.id] = 1;
  }
}
