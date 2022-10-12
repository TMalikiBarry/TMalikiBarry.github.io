import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./auth.interceptor";

// L'utilisation de  HTTP_INTERCEPTORS  dit à Angular qu'il s'agit ici d'un intercepteur HTTP. Vous y attribuez la classe AuthInterceptor
// que vous venez de créer. La clé multi  prévient que vous allez certainement ajouter plusieurs intercepteurs à la clé HTTP_INTERCEPTORS.

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]
