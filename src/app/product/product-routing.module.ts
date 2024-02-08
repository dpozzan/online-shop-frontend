import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { CanDeactivateProductDetailGuard } from "./product-detail/can-deactivate-product-detail-guard.service";
import { ProductResolver } from "../resolvers/product-resolver.service";

const routes: Routes = [
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailComponent, canDeactivate: [CanDeactivateProductDetailGuard], resolve: { product: ProductResolver } },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductRoutingModule {}