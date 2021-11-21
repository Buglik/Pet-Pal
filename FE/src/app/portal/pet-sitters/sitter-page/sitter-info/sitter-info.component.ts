import {Component, Input} from '@angular/core';
import {PetSitterResponse} from "../../../../../api/src";
import {DateRange} from "@angular/material/datepicker";

@Component({
  selector: 'app-sitter-info',
  templateUrl: './sitter-info.component.html',
  styleUrls: ['./sitter-info.component.scss']
})
export class SitterInfoComponent {

  @Input() sitter: PetSitterResponse;


  get availabilityObject(): DateRange<Date> {
    return new DateRange(new Date(this.sitter.availability_start_date), new Date(this.sitter.availability_end_date));
  }
}
