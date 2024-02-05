import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductResolver } from './resolvers/product-resolver.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BasketResolver } from './resolvers/basket-resolver.service';
import { CanDeactivateProductDetailGuard } from './product/product-detail/can-deactivate-product-detail-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent, canDeactivate: [CanDeactivateProductDetailGuard], resolve: { product: ProductResolver } },
  { path: 'basket', component: ShoppingCartComponent, resolve: { basket: BasketResolver } },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
