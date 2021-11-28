import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReviewFormComponent} from "./sitter-page/review-form/review-form.component";
import {MeResponse, ReviewRequest, ReviewsService} from "../../../api/src";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import {NotificationService} from "../../utils/notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private pendingSub$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  pending$: Observable<boolean> = this.pendingSub$.asObservable();

  constructor(private dialog: MatDialog,
              private notificationService: NotificationService,
              private readonly reviewController: ReviewsService) {
  }


  openAddReviewForm(profile: MeResponse) {
    this.dialog.open(ReviewFormComponent, {
      panelClass: 'add-review-modal',
      width: '720px',
      data: {
        profile: profile,
      },
    });
  }

  addReview(data: ReviewRequest, username: string) {
    this.pendingSub$.next(true);
    return this.reviewController.reviewsCreate(data, username).pipe(
      map(_ => {
        this.pendingSub$.next(false);
        this.notificationService.success('notification.review.create.success');
        this.dialog.closeAll();
        return true
      }),
      catchError(err => {
        this.pendingSub$.next(false);
        this.notificationService.error('notification.review.create.fail');
        this.dialog.closeAll();
        return throwError(err);
      }),
      take(1)
    ).subscribe()
  }

}
