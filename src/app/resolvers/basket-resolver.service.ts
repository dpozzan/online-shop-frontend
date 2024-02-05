import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../product/product.model";
import { Injectable } from "@angular/core";
import { ShoppingCartsService } from "../services/shopping-carts.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BasketResolver implements Resolve<Product[]>{
    
    constructor(private shoppingCartService: ShoppingCartsService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
        return this.shoppingCartService.fetchShoppingCart()
    }
}