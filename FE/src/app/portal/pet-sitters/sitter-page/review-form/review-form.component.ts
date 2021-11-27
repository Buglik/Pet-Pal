import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MeResponse} from "../../../../../api/src";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ReviewsService} from "../../reviews.service";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: { profile: MeResponse }) {
  }


  onSubmit() {

  }

}
