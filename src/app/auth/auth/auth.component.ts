import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true
  constructor(private route: ActivatedRoute) {}


  onSubmit(form: NgForm) {
    console.log(form)

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(loginMode => this.isLoginMode = loginMode['mode'] === 'login')
   
  }

}
