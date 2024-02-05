import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8080/products').pipe(
      map((products: Product[]) => {
        return products.map((product) => {
          return {...product, quantity: 1}
        })
      })
    )
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>('http://localhost:8080/products/' + id)
  }


}
