import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {AuthService, RegisterRequest} from "../../../api/src";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private authService: AuthService) {
  }

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  registerUser(registerData: RegisterRequest) {
    this.pendingSub.next(true);
    this.authService.authRegisterCreate(registerData).pipe(
      map(_ => {
        console.log('HIHI SUCCESS')
        this.pendingSub.next(false);
      }),
      catchError(error => {
        console.log(error.error)
        this.pendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }

  verifyEmail(token: string) : Observable<boolean> {
    console.log(token);
    this.pendingSub.next(true);
    return this.authService.authVerifyRetrieve(token).pipe(
      map(_ => {
        console.log('verification success')
        this.pendingSub.next(false);
        return true
      }),
      catchError(error => {
        console.log(error)
        this.pendingSub.next(false);
        return of(false)
      }),
      take(1));
  }

}
