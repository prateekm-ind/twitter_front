import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/shared/auth.service';
import { SignupRequestPayload } from './auth-signup-request.payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  signupForm: FormGroup;
  signUpRequestPayload : SignupRequestPayload;
  
  constructor( private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.signupForm = new FormGroup ({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null)
    });
    
  }

  onSignup(){
    console.warn(this.signupForm.controls['email'].value);
    this.signUpRequestPayload ={
      emailabc: this.signupForm.value.email,
      usernameabc : this.signupForm.value.username,
      passwordabc: this.signupForm.value.password
    }
    
    this.authService.signup(this.signupForm.value).subscribe(
      ()=>{
        //this.toastr.success('Registration Successful! Proceed to Login');
        this.router.navigate(['/login'],
        {queryParams: {registered : true}});
      }, 
      ()=>{
        this.toastr.error('Registration Failed! Please try Again');
      })
  }

}
