import {Component, Input} from '@angular/core';
import {ReviewResponse} from "../../../../../../api/src";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {

  @Input() review: ReviewResponse;

}
