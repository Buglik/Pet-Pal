import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PetSitterResponse, ReviewResponse} from "../../../../../api/src";
import {DateRange} from "@angular/material/datepicker";
import {TablePaginationParams} from "../../../../state/sitters/sitters.actions";
import {ReviewsService} from "../../reviews.service";

@Component({
  selector: 'app-sitter-info',
  templateUrl: './sitter-info.component.html',
  styleUrls: ['./sitter-info.component.scss']
})
export class SitterInfoComponent {

  @Input() sitter: PetSitterResponse;
  @Input() reviews: ReviewResponse[];
  @Input() reviewPending: boolean;

  @Input() pagination: TablePaginationParams;
  @Output() paginationChanged: EventEmitter<TablePaginationParams> = new EventEmitter<TablePaginationParams>();

  constructor(private readonly reviewService: ReviewsService) {
  }

  get availabilityObject(): DateRange<Date> {
    return new DateRange(new Date(this.sitter.availability_start_date), new Date(this.sitter.availability_end_date));
  }

  openAddReviewModal() {
    this.reviewService.openAddReviewForm(this.sitter.profile);
  }
}
