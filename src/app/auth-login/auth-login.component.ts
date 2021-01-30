import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/shared/auth.service';
import { LoginRequestPayload } from './login.request.payload';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  loginForm : FormGroup;
  isError: boolean;
  loginRequestPayload : LoginRequestPayload;

  constructor(private authservice : AuthService, private router: Router, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.loginRequestPayload = {
      username:'',
      password:''
    };
   }

  ngOnInit(): void {
    this.loginForm= new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams.subscribe(params=>{
      if(params.registered!== undefined && params.registered === 'true'){
        this.toastr.success("Registration sucessful!");
      }
    })
  }

  login(){
    this.loginRequestPayload.username= this.loginForm.get('username').value;
    this.loginRequestPayload.password=this.loginForm.get('password').value;

    this.authservice.login(this.loginRequestPayload).subscribe( data =>{
      if(data){
        this.isError=false;
        this.toastr.success("Login succesful");
      }
      else{
        this.isError=true;
        this.toastr.error("Login failed. Please check your credentials");
      }
    });
  }
}
