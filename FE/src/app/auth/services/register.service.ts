import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {AuthService, RegisterRequest} from "../../../api/src";
import {NotificationService} from "../../utils/notification/notification.service";
import {NavigationService} from "../../navigation.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private authService: AuthService,
              private readonly notificationService: NotificationService,
              private readonly navigationService: NavigationService) {
  }

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  private errorSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error$: Observable<any> = this.errorSub.asObservable();

  registerUser(registerData: RegisterRequest) {
    this.errorSub.next(null);
    this.pendingSub.next(true);
    this.authService.authRegisterCreate(registerData).pipe(
      map(_ => {
        this.notificationService.success('Registration completed successfully! You can now login using provided credentials')
        this.pendingSub.next(false);
        this.navigationService.toLoginPage();
      }),
      catchError(error => {
        console.log(error.error)
        this.errorSub.next(error.error);
        this.pendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }

  verifyEmail(token: string): Observable<boolean> {
    console.log(token);
    this.pendingSub.next(true);
    return this.authService.authVerifyRetrieve(token).pipe(
      map(_ => {
        this.pendingSub.next(false);
        return true
      }),
      catchError(error => {
        this.notificationService.error('Email verification failed')
        this.pendingSub.next(false);
        return of(false)
      }),
      take(1));
  }

}
