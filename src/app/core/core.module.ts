import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import {httpInterceptorProviders} from "./interceptors";
import * as fr from "@angular/common/locales/fr";
import {HeaderComponent} from "./components/header/header.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    httpInterceptorProviders
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  exports:[
    HeaderComponent
  ]

})
export class CoreModule {
  constructor() {
    registerLocaleData(fr.default);
  }
}
