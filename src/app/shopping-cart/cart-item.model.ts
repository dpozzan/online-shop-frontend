export class CartItem {
    id: number;
    productId: number;
    quantity: number;

    constructor(id: number, productId: number, quantity: number){
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }
}