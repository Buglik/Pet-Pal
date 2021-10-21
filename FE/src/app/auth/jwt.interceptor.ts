import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {switchMap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {TokenService} from "./services/token.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  REFRESH_TOKEN_URL = 'http://localhost:8000/auth/login/refresh';

  constructor(private readonly tokenService: TokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwt = this.tokenService.getAccessToken();
    const isAccessExpired = this.tokenService.isTokenExpired();

    if (jwt) {
      if (isAccessExpired) {
        if (request.url === this.REFRESH_TOKEN_URL) {
          return next.handle(request);
        } else {
          this.tokenService.refreshToken().pipe(
            switchMap(tokenRefreshSuccess => {
              if (tokenRefreshSuccess) {
                const newToken = this.tokenService.getAccessToken()
                // @ts-ignore
                return next.handle(this.addTokenToHeader(request, newToken))
              } else {
                //user unauthorized
                return of(false)
              }
            })
          )
        }
      } else {
        return next.handle(this.addTokenToHeader(request, jwt))
      }
    }
    return next.handle(request);
  }


  private addTokenToHeader(request: HttpRequest<any>, jwt: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      }
    });
  }
}
