export class Product {
    name: string;
    description: string;
    price: number;
    image_urls: string[];
    id: number;
    quantity: number;

    constructor(id: number, name: string, description: string, price: number, imageUrls: string[], minQuantity: number) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.image_urls = imageUrls;
        this.id = id
        this.quantity = minQuantity

    }
}