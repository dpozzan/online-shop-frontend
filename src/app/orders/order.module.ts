import { NgModule } from "@angular/core";
import { OrderDetailComponent } from "./order-detail/order-detail.component";
import { OrderRoutingModule } from "./order-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        OrderDetailComponent,
    ],
    imports: [
        OrderRoutingModule,
        CommonModule
    ]
})
export class OrderModule {}