import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../product/product.model";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ProductsService } from "../services/products.service";

@Injectable({
    providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
    constructor(private productsService: ProductsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | 
    Product {
        const productId = route.params['id']
        return this.productsService.getProduct(productId)
    }

}