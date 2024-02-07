import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


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
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {}


  onSubmit(form: NgForm) {
    if(this.isLoginMode){
      this.authService.login(form.value).subscribe({
        next: () => {
          this.error = null;
          this.router.navigate(['/products']);
        }, 
        error: (error) => {
          this.error = error;
        }
      })
    } else {
      this.authService.register(form.value).subscribe({
        next: (response) => {
          this.message = response.message;
          this.error = null;
          this.messageTimeout = setTimeout(() => {
            this.message = null;
          }, 1500)
        },
        error: (error) => {
          this.error = error;
        }
      })
    }

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.isLoginMode = queryParams['mode'] === 'login';
      if(queryParams['message']) {
        this.message = 'You must be logged in to proceed with the checkout.';
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
