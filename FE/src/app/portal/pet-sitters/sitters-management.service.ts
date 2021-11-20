import {Injectable} from '@angular/core';
import {PetSitterRequest, PetSittersService} from "../../../api/src";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppState} from "../../state/app.state";
import {NotificationService} from "../../utils/notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class SittersManagementService {

  private pendingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub.asObservable();

  private errorSub: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  error$: Observable<any> = this.errorSub.asObservable();

  constructor(private readonly petsitterService: PetSittersService,
              private readonly notificationService: NotificationService,
              private readonly store: Store<AppState>) {
  }

  createSitter(data: PetSitterRequest) {
    this.pendingSub.next(true);
    this.errorSub.next(null);
    this.petsitterService.petSittersCreate(data).pipe(
      map(_ => {
        this.notificationService.success('notification.sitter.create.success');
        //       redirect to sitter page
        this.pendingSub.next(false);
      }),
      catchError(error => {
        this.errorSub.next(error.error);
        this.notificationService.error('notification.sitter.create.fail');
        this.pendingSub.next(false);
        return of()
      }),
      take(1),
    ).subscribe()
  }
}
