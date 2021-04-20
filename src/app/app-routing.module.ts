import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  {  path: '', component : HeaderComponent },
  {  path: 'home', component : HomePageComponent },
  {  path: 'signup', component: AuthSignupComponent  },
  {  path: 'login', component : AuthLoginComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
