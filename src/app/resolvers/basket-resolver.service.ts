import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../product/product.model";
import { Injectable } from "@angular/core";
import { ShoppingCartsService } from "../services/shopping-carts.service";
import { Observable, concatMap, map, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectShoppingCart, selectShoppingCartPrice } from "../shopping-cart/shopping-cart.selectors";

interface BasketResolverType {
    basket: Product[];
    price: number;
}

@Injectable({
    providedIn: 'root'
})
export class BasketResolver implements Resolve<BasketResolverType>{
    
    constructor(private shoppingCartService: ShoppingCartsService, private store: Store){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): BasketResolverType | Observable<BasketResolverType> | Promise<BasketResolverType> {
        return this.store.select(selectShoppingCart).pipe(
           switchMap(shoppingCart => 
                this.store.select(selectShoppingCartPrice).pipe(
                    map(price => {
                        return ({ basket: shoppingCart, price })
                    })
                )
            )
        )
    }
}