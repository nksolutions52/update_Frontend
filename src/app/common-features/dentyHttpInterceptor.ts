import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';


@Injectable() 
export class DentyHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent
    | HttpResponse<any> | HttpUserEvent<any>> {
        const token = sessionStorage.getItem('token');
        console.log(token);
        if(token) {
           req = req.clone({
            setHeaders: {
              Authorization: 'Bearer' + ' ' + token,
            }
          });
        } else {
            this.router.navigate(['/']);
        }
        return next.handle(req).pipe(tap(event => {
      
        }, error => {
        })
        );
    }
}