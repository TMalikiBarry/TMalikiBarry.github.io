import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .append(`Authaurization`, `Bearer ${this.authService.getToken()}`);

    const securedReq = req.clone({headers});

    return next.handle(securedReq);
  }

}
