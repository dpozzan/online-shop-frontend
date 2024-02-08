import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { CanActivateOrderDetailGuard } from "./order-detail/can-activate-order-detail-guard.service";

const routes: Routes = [
    { path: 'orders/:id', component: OrderDetailComponent, canActivate: [CanActivateOrderDetailGuard] },

]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class OrderRoutingModule {

}