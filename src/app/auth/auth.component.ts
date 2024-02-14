import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { callLogin, callRegister } from './auth.actions';
import { selectAuth } from './auth.selectors';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  error: string | undefined = null;
  message: string | undefined = null;
  isLoginMode: boolean = true;
  messageTimeout: any;
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService,
    private store: Store
  ) {}


  onSubmit(form: NgForm) {
    if(this.isLoginMode){
      this.store.dispatch(callLogin(form.value))
    } else {
      this.store.dispatch(callRegister(form.value))
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.isLoginMode = queryParams['mode'] === 'login';
      if(queryParams['message']) {
        this.message = 'You must be logged in to proceed with the checkout.';
      }
    })
    this.store.select(selectAuth).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = res.error;
        this.messageTimeout = setTimeout(() => {
          this.message = null;
        }, 1500)

      },
      error: (err) => {
        this.error = err;
      }
    })
    
  }

  toggleLoginMode(): void {
    this.isLoginMode = !this.isLoginMode;
    const queryParams = { mode: this.isLoginMode ? 'login' : 'signup'};
    this.router.navigate([], {queryParams: queryParams, queryParamsHandling: 'merge'} )
  } 

  ngOnDestroy(): void {
    clearTimeout(this.messageTimeout)
  }

 

}
