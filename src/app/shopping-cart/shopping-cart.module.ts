import { NgModule } from "@angular/core";
import { ShoppingCartComponent } from "./shopping-cart.component";
import { CommonModule } from "@angular/common";
import { ShoppingCartRoutingModule } from "./shopping-cart-routing.module";

@NgModule({
    declarations: [
        ShoppingCartComponent,
    ],
    imports: [
        CommonModule,
        ShoppingCartRoutingModule
    ],

})
export class ShoppingCartModule {

}