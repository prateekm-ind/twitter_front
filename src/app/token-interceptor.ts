import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "./auth/shared/auth.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    
    constructor(public authService: AuthService) { }
    
    //HttpInterceptor implements this method
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
       if(this.authService.getJwtToken() !== null ){
           this.addToken(req, this.authService.getJwtToken());
       }

       return next.handle(req).pipe(catchError(this.handleError));
    }

    private addToken(req: HttpRequest<any>, jwtToken: string) {
        return req.clone({
            headers: req.headers.set('Authorization', 'Bearer '+ jwtToken)
        });
    }

    //Global Error handling 
    handleError(error: HttpErrorResponse){
        return throwError(error);
      }
}