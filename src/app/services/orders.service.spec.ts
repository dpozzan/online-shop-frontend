import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { TestBed } from "@angular/core/testing"
import { OrdersService } from "./orders.service"

xdescribe('OrdersService', () => {
    let ordersService: OrdersService,
        httpTestingController: HttpTestingController
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrdersService]
        })

        ordersService = TestBed.inject(OrdersService);
        httpTestingController = TestBed.inject(HttpTestingController);
    })

    it('should retrieve a specific order by id', () => {
        const mockOrder = { id: 1, total_price: 10.10, customer_id: 1 }

        ordersService.getOrder('1').subscribe((order) => {
            expect(order).toBeTruthy();
            expect(order.total_price).toEqual(10.10);
            expect(order).toEqual(mockOrder);
        })

        const req = httpTestingController.expectOne('http://localhost:8080/orders/1')

        expect(req.request.method).toBe('GET');
        req.flush(mockOrder);
    })

    it('should create a new order', () => {
        const mockOrder = { id: 1, total_price: 10.10, customer_id: 1 }

        const mockFinalOrder = { id: 1, total_price: 20.20, customer_id: 1 }

        const basket = [
            {id: 1, name: "test product", description: "test description", price: 10.10, image_urls: ['test.jpg'], quantity: 1 },
            {id: 2, name: "test product", description: "test description", price: 10.10, image_urls: ['test.jpg'], quantity: 1 },
        ];

        ordersService.createOrder(basket).subscribe((order) => {
            console.log('response--------------------------------------------------------------------------------\n', order)
            expect(order.order.id).toEqual(1);
            expect(order.order.total_price).toEqual(10.10);
        })

        const reqOrderCreation = httpTestingController.expectOne('http://localhost:8080/orders');
        expect(reqOrderCreation.request.method).toBe('POST');
        reqOrderCreation.flush(mockOrder);

        const reqCartItem1 = httpTestingController.expectOne('http://localhost:8080/cart-items');
        expect(reqCartItem1.request.method).toBe('POST');
        expect(reqCartItem1.request.body.id).toBe(1)
        reqCartItem1.flush({})

        const reqCartItem2 = httpTestingController.expectOne('http://localhost:8080/cart-items');
        expect(reqCartItem2.request.method).toBe('POST');
        expect(reqCartItem2.request.body.id).toBe(2);

        const reqOrderUpdate = httpTestingController.expectOne('http://localhost:8080/orders');
        expect(reqOrderUpdate.request.method).toBe('PUT');
        reqOrderUpdate.flush(mockFinalOrder)
    })

    afterEach(() => {
        httpTestingController.verify();
    })
})