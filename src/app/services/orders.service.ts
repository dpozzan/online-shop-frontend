import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, finalize, from, map, of, switchMap, tap, toArray } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrder(id: string): Observable<any> {
    return this.http.get<{id: number, total_price: number, customer_id: number}>('http://localhost:8080/orders/' + id)
  }

  createOrder(basket: Product[]): Observable<any> {
    return this.http.post<any>('http://localhost:8080/orders', {}).pipe(
      catchError(errorResponse => {throw new Error(errorResponse.error.message)}),
      concatMap(order =>
        from(basket).pipe(
          concatMap(basketItem => {
            const requestBody = {
              "product_id": basketItem.id,
              "quantity": basketItem.quantity,
              "order_id": order.id
            };
            return this.http.post<any>('http://localhost:8080/cart-items', requestBody).pipe(
              catchError(error => {
                console.log('Error processing basket item', basketItem, error);
                return of(null);
              })
            )
          }),
          toArray(), // Correct placement: Collects all HTTP responses into an array
          map(cartItemsResponses => ({order:{...order}, cart_items: cartItemsResponses})), // Combine order with cart items responses
        )
      ),
      concatMap(setPriceOrderBody => {
        return this.http.put('http://localhost:8080/orders', setPriceOrderBody).pipe(
          catchError(error => {
            console.log('Error setting order total price', setPriceOrderBody, error)
            return of(null)
          })
        )
      })
    )
  }


}
