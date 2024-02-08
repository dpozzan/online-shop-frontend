import { NgModule } from "@angular/core";
import { AuthComponent } from "./auth.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";


@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule
    ],
    exports: [
        FormsModule
    ]
})
export class AuthModule {}