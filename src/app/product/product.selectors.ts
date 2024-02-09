import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "./product.model";
import { ProductState } from "./product.reducer";


export const selectCatalogue = createFeatureSelector<ProductState>('catalogue');

export const selectProducts = createSelector(
    selectCatalogue,
    (catalogue: ProductState) => catalogue.products
);

export const selectProduct = createSelector(
    selectCatalogue,
    (catalogue: ProductState) => catalogue.productDetail
)