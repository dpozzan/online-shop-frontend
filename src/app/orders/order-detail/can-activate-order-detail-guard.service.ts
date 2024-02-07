import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, Subscription, map, take } from "rxjs";
import { OrdersService } from "../../services/orders.service";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class CanActivateOrderDetailGuard implements CanActivate {
    authSubscr: Subscription;
    isLoggedIn: boolean;
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // Implement your check logic here
        // For example, check if the order exists and the user has permission to access it
        // This is a placeholder implementation
        if(this.authService.checkLoginStatus()){
            return true;
        } else {
            return this.router.createUrlTree(['auth'], {queryParams: {mode: 'login'}});
        }
    }
}
