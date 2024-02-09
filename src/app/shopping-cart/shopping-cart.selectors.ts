import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "../product/product.model";


export const selectShoppingCart = createFeatureSelector<Product[]>('shoppingCart');

export const selectShoppingCartLength = createSelector(
    selectShoppingCart,
    (shoppingCart) => shoppingCart.length
);

export const selectShoppingCartPrice = createSelector(
    selectShoppingCart,
    (shoppingCart) => {
        let totalPrice = 0;
        for(const item of shoppingCart){
            totalPrice += (item.price * item.quantity)
        }

        return +totalPrice.toFixed(2)
    }
)