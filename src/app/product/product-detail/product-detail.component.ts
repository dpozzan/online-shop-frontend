import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../product.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: Product | null = null;
  public staticPath = environment.staticPath;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // let productId: string = '';
    // this.route.params.subscribe((params) => productId = params['id'])
    // this.productService.getProduct(productId).subscribe((product) => {
    //   this.product = product

    //   console.log('product: ', product)
    // })
    this.route.data.subscribe((data) => this.product = data['product'])
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true
  }

}
