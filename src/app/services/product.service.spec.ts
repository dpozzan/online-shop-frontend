import { TestBed } from "@angular/core/testing"
import { ProductsService } from "./products.service"
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ProductService', () => {
    let productService: ProductsService,
        httpTestingController: HttpTestingController


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
        })

        productService = TestBed.inject(ProductsService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('should retrieve all products', () => {
        const mockProducts = [{id: 1, name: "test product", description: "test description", price: 10.10, image_urls: ['test.jpg'], quantity: 1 }]

        productService.getProducts().subscribe((products) => {
            expect(products).toBeTruthy();
            expect(products.length).toBe(1);
            expect(products).toEqual(mockProducts)
        });

        const req = httpTestingController.expectOne('http://localhost:8080/products');
        expect(req.request.method).toEqual('GET');
        req.flush(mockProducts)
    })

    it('should retrieve the product with the given id', () => {
        const mockProduct = {id: 1, name: "test product", description: "test description", price: 10.10, image_urls: ['test.jpg'], quantity: 1 }

        productService.getProduct('1').subscribe((product) => {
            expect(product).toBeTruthy();
            expect(product.name).toBe("test product");
            expect(product).toEqual(mockProduct);
        })

        const req = httpTestingController.expectOne((req) => req.url === 'http://localhost:8080/products/1')
        expect(req.request.method).toEqual('GET');
        req.flush(mockProduct);
    })

    afterEach(() => {
        httpTestingController.verify()
    })
})