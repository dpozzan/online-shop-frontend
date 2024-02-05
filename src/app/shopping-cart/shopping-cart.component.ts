import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product/product.model';
import { environment } from 'src/environments/environment';
import { ShoppingCartsService } from '../services/shopping-carts.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, DoCheck { // Fixed class implementation by changing OnDoCheck to DoCheck
  basket: Product[] = [];
  public totalPrice: number = 0;
  public staticPath = environment.staticPath;
  constructor(private route: ActivatedRoute, private shoppingCartsService: ShoppingCartsService) {}

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


}
