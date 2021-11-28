import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReviewFormComponent} from "./sitter-page/review-form/review-form.component";
import {MeResponse, ReviewRequest, ReviewsService} from "../../../api/src";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private errorSub$: BehaviorSubject<boolean>

  constructor(private dialog: MatDialog,
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
    this.reviewController.reviewsCreate(data, username);
  }

}
