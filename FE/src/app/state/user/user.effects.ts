import {Observable, of} from "rxjs";
import {Action} from "@ngrx/store";
import {Injectable} from "@angular/core";
import {
  getUser,
  getUserError,
  getUserSuccess,
  loginUser,
  loginUserError,
  loginUserSuccess,
  logoutUser,
  logoutUserError,
  logoutUserSuccess
} from "./user.action";
import {AuthService, LoginResponse, LogoutRequest} from "../../../api/src";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {TokenService} from "../../auth/services/token.service";
import {NavigationService} from "../../navigation.service";

@Injectable()
export class UserEffects {
  private loginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      switchMap(userLoginData =>
        this.authService.authLoginCreate(userLoginData).pipe(
          map((tokens: LoginResponse) => loginUserSuccess(tokens)),
          catchError(error => of(loginUserError()))
        )
      ),
      tap(_ => console.log('Logging...')),
    ))

  private loginUserSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUserSuccess),
      tap((tokens) => {
        this.navigation.back();
        this.tokenService.saveTokens(tokens.access, tokens.refresh);
      }),
    ), {dispatch: false})

  private logoutUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      switchMap(_ =>
        this.authService.authLogoutCreate({refresh: this.tokenService.getRefreshToken()} as LogoutRequest).pipe(
          map(_ => logoutUserSuccess()),
          catchError(err => of(logoutUserError()))
        ))
    ), {dispatch: false})

  private logoutUserSuccess$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUserSuccess),
      tap(_ => this.tokenService.clear())
    ), {dispatch: false})

  private getUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(_ =>
        this.authService.authmeRetrieve().pipe(
          map(item => {
            console.log(item)
            return getUserSuccess(item)
          }),
          catchError(error => {
            console.log(error)
            return of(getUserError())
          })
        )
      ),
      tap(_ => console.log("Getting user data"))
    ))


  constructor(private actions$: Actions,
              private authService: AuthService,
              private readonly tokenService: TokenService,
              private router: Router,
              private navigation: NavigationService
  ) {
  }
}
