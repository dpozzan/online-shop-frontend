import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../services/products.service";
import { loadProduct, loadProducts, setProductFailure, setProductSuccess, setProducts } from "./product.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Product } from "./product.model";

@Injectable()
export class ProductEffects {
    loadProducts$ = createEffect(() => this.actions$.pipe(
        ofType(loadProducts),
        mergeMap(() => this.productsService.getProducts().pipe(
            map((products: Product[]) => setProducts({ products }))
        ))
    ))

    loadProduct$ = createEffect(() => this.actions$.pipe(
        ofType(loadProduct),
        mergeMap((action) => this.productsService.getProduct(action.id).pipe(
            map((product: Product) => setProductSuccess({ product })),
            catchError(error => of(setProductFailure({ error })))
        ))
    ))

    constructor(private actions$: Actions, private productsService: ProductsService) {}
}