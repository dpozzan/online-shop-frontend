import { NgModule } from "@angular/core";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderRoutingModule } from "./order-routing.module";

@NgModule({
    declarations: [
        OrderDetailComponent,
    ],
    imports: [
        OrderRoutingModule
    ]
})
export class OrderModule {}