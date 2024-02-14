import { createAction, props } from "@ngrx/store";
import { Product } from "./product.model";

export const LOAD_PRODUCTS = '[Product] Load Products';
export const LOAD_PRODUCT = '[Product] Load Product';
export const SET_PRODUCTS = '[Product] Set Products';
export const SET_PRODUCT_SUCCESS = '[Product] Set Product Success';
export const SET_PRODUCT_FAILURE = '[Product] Set Product Failure';

// These actions are used to trigger effects that utilize the service to make HTTP/async requests
export const loadProducts = createAction(LOAD_PRODUCTS);
export const loadProduct = createAction(LOAD_PRODUCT, props<{id: string}>());

// These other actions are synchronous and use the response of the effects to set the state in the store
export const setProducts = createAction(
    SET_PRODUCTS,
    props<{products: Product[]}>()
);

export const setProductSuccess = createAction(
    SET_PRODUCT_SUCCESS,
    props<{product: Product}>()
)

export const setProductFailure = createAction(
    SET_PRODUCT_FAILURE,
    props<{error: any}>()
)

export type ProductActions = 
    typeof loadProducts | 
    typeof loadProduct | 
    typeof setProducts |
    typeof setProductSuccess |
    typeof setProductFailure
