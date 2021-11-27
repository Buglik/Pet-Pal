import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ReviewFormComponent} from "./sitter-page/review-form/review-form.component";
import {MeResponse} from "../../../api/src";

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  constructor(private dialog: MatDialog) {
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
}
