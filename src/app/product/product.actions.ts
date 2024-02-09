import { createAction, props } from "@ngrx/store";
import { Product } from "./product.model";

export const loadProductsAction = '[Product] Load Products';
export const loadProductAction = '[Product] Load Product';
export const setProductsAction = '[Product] Set Products';
export const setProductSuccessAction = '[Product] Set Product Success';
export const setProductFailureAction = '[Product] Set Product Failure';

// These actions are used to trigger effects that utilize the service to make HTTP/async requests
export const loadProducts = createAction(loadProductsAction);
export const loadProduct = createAction(loadProductAction, props<{id: string}>());

// These other actions are synchronous and use the response of the effects to set the state in the store
export const setProducts = createAction(
    setProductsAction,
    props<{products: Product[]}>()
);

export const setProductSuccess = createAction(
    setProductSuccessAction,
    props<{product: Product}>()
)

export const setProductFailure = createAction(
    setProductFailureAction,
    props<{error: any}>()
)