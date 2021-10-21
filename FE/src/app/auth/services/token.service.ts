import {AuthService, TokenRefresh} from "../../../api/src";
import {Injectable} from "@angular/core";
import {catchError, map, take} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, of} from "rxjs";

const jwtHelper: JwtHelperService = new JwtHelperService()

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private readonly authService: AuthService) {
  }

  getAccessToken(): string | null {
    // @ts-ignores
    return localStorage.getItem("jwt-access");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('jwt-refresh');
  }

  saveTokens(access?: string, refresh?: string) {
    if (access) localStorage.setItem('jwt-access', access)
    if (refresh) localStorage.setItem('jwt-refresh', refresh)
  }

  isTokenExpired(): boolean {
    // @ts-ignore
    return jwtHelper.isTokenExpired(this.getAccessToken())
    // return false
  }

  refreshToken(): Observable<boolean> {
    const refToken = this.getRefreshToken();
    if (refToken) {
      return this.authService.authLoginRefreshCreate({refresh: refToken} as TokenRefresh).pipe(
        map((newTokens: TokenRefresh) => {
          this.saveTokens(newTokens.access, newTokens.refresh);
          return true
        }),
        catchError(_ => of(false)),
        take(1)
      )
    } else return of(false)
  }

  clear() {
    localStorage.removeItem('jwt-access');
    localStorage.removeItem('jwt-refresh');
  }
}
