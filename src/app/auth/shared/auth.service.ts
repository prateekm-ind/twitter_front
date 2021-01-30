import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignupRequestPayload } from 'src/app/auth-signup/auth-signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayload } from 'src/app/auth-login/login.request.payload';
import { LoginResponsePayload } from 'src/app/auth-login/login.response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private localStorage: LocalStorageService) {}

  signup(signUpRequestPayload : SignupRequestPayload) : Observable<any>{
    return this.http.post('http://localhost:8081/twitter/api/auth/signup', signUpRequestPayload, { responseType : 'text'});
  }

  login(loginRequest: LoginRequestPayload): Observable<boolean>{
    return this.http.post<LoginResponsePayload>('http://localhost:8081/twitter/api/auth/signin' ,
     loginRequest).pipe( map (data=>{
        this.localStorage.store('authenticationToken', data.jwt);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('username', data.username)
        return true;
      })); 
     }

}
