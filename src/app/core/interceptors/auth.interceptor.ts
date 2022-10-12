import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService) {
  }
  // @ts-ignore

  // vous créez des  headers  utilisables par Angular avec  new HttpHeaders() et vous utilisez leur méthode  append()
  // pour y ajouter un header  Authorization  qui contient  Bearer TOKEN   – c'est souvent la forme requise pour ce type de header ;
  //
  // vous créez une nouvelle requête en clonant la précédente et en y ajoutant les  headers  que vous venez de créer
  // – les requêtes sont des objets immuables (qu'on ne peut pas modifier), donc on créera toujours une nouvelle requête
  // qui contient les modifications requises ;
  //
  // vous retournez  next.handle()  en y passant la nouvelle requête – c'est ce qui permet à la requête de continuer son chemin.


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .append(`Authaurization`, `Bearer ${this.authService.getToken()}`);

    const securedReq = req.clone({headers});

    return next.handle(securedReq);
  }

}
