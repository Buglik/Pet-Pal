import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
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
      })
    ).subscribe()
  }

}
