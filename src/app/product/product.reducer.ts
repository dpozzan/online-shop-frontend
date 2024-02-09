import { createReducer, on } from "@ngrx/store";
import { Product } from "./product.model";
import { setProductFailure, setProductSuccess, setProducts } from "./product.actions";

export interface ProductState {
    products: Product[];
    productDetail: Product | null;
    error: null;
}

const initialState: ProductState = {
    products: [],
    productDetail: null,
    error: null
}

export const productReducer = createReducer(
    initialState,
    on(setProducts, (state, { products }) => ({...state, products})),
    on(setProductSuccess, (state, { product }) => ({...state, productDetail: product})),
    on(setProductFailure, (state, { error }) => ({...state, error})) 
    
)