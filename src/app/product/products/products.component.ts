import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { ShoppingCartsService } from 'src/app/services/shopping-carts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  products: Product[] = []
  product!: Product
  public staticPath = environment.staticPath;
  public quantity: number = 1;

  constructor(private productsService: ProductsService, private shoppingCartsService: ShoppingCartsService) {}

  ngOnInit() {

    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products
    })

  }

  decreaseQuantity(product: Product) {
    if(product.quantity && product.quantity > 1){
      product.quantity--
      this.quantity--
    }
  }

  increaseQuantity(product: Product) {
    if(product.quantity && product.quantity < 99){
      product.quantity++
      this.quantity++
    }
    
  }
  
  async addToCart(product: Product) {
    const productToItem = {...product, quantity: this.quantity}
    await this.shoppingCartsService.saveTemporaryItem(productToItem);  
    product.quantity = 1;
    this.quantity = 1;
  }


}
