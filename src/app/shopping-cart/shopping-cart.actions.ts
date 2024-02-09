import { createAction, props } from "@ngrx/store";
import { Product } from "../product/product.model";



export const add = createAction(
    '[Shopping Cart] Add Item',
    props<{item: Product}>()
);

export const remove = createAction(
    '[Shopping Cart] Remove Item',
    props<{item: Product}>()
);