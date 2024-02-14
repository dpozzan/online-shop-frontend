import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../product/product.model";
import { Observable, map, of } from "rxjs";
import { Injectable } from "@angular/core";
import { ProductsService } from "../services/products.service";
import { Store } from "@ngrx/store";
import { loadProduct, setProductSuccess } from "../product/product.actions";
import { Actions, ofType } from "@ngrx/effects";

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
    constructor(private productsService: ProductsService, private store: Store, private actions$: Actions) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | 
    Product {
        const productId = route.params['id']
        this.store.dispatch(loadProduct({id: productId}));
        return this.actions$.pipe(
            ofType(setProductSuccess),
            map((action) => action.product)
        )
        // return this.store.select(selectProduct);
        // return this.productsService.getProduct(productId)
    }

}