import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductModule } from './product/product.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { OrderModule } from './orders/order.module';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,   
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    ProductModule,
    ShoppingCartModule,
    AuthModule,
    OrderModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true  
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
