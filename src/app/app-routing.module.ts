import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
  {  path: 'home', component : HeaderComponent },
  {  path: 'signup', component: AuthSignupComponent  },
  {  path: 'login', component : AuthLoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
