import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {userReducer} from "./state/user/user.reducer";
import {UserEffects} from "./state/user/user.effects";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./auth/jwt.interceptor";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IsLoggedGuard} from "./guards/is-logged.guard";
import {UtilsModule} from "./utils/utils.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({user: userReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([UserEffects]),
    UtilsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
    IsLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
