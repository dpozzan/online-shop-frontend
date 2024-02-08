import { NgModule } from "@angular/core";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { ProductRoutingModule } from "./product-routing.module";


@NgModule({
    declarations: [
        ProductsComponent,
        ProductDetailComponent,
    ], 
    imports: [
        FormsModule,
        BrowserModule,
        ProductRoutingModule
    ],
    exports: [ProductRoutingModule]
})
export class ProductModule {}