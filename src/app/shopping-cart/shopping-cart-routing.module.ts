import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingCartComponent } from "./shopping-cart.component";
import { BasketResolver } from "../resolvers/basket-resolver.service";

const routes: Routes = [
    { path: 'basket', component: ShoppingCartComponent, resolve: { basketInfo: BasketResolver } },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ShoppingCartRoutingModule {

}