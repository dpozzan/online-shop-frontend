import { createReducer, on } from "@ngrx/store";
import { Product } from "../product/product.model";
import { add, remove } from "./shopping-cart.actions";

const initialState: Product[] = [] 

export const shoppingCartReducer = createReducer(
    initialState,
    on(add, (state, { item }) => {
        let isProductFound: boolean = state.some(cartItem => cartItem.id === item.id);
        return isProductFound
            ? state.map(cartItem => 
                cartItem.id === item.id 
                ? {...cartItem, quantity: cartItem.quantity + 1} 
                : cartItem)
            : [...state, item];
    }),
    on(remove, (state, { item }) => {
        return state.reduce((acc, cartItem) => {
            if (cartItem.id === item.id) {
                // If the item's quantity is greater than 1, decrease it. Otherwise, exclude it from the new state.
                const updatedQuantity = cartItem.quantity - 1;
                if (updatedQuantity > 0) {
                    acc.push({ ...cartItem, quantity: updatedQuantity });
                }
            } else {
                // Keep all other items as they are.
                acc.push(cartItem);
            }
            return acc;
        }, []);
    })
)


