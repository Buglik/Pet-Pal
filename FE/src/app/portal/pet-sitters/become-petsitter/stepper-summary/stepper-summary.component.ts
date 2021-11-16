import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {DateRange} from "@angular/material/datepicker";
import {Moment} from "moment/moment";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';


@Component({
  selector: 'app-stepper-summary',
  templateUrl: './stepper-summary.component.html',
  styleUrls: ['./stepper-summary.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MAT_MOMENT_DATE_FORMATS
    }]
})
export class StepperSummaryComponent {

  @Input() experienceForm: FormGroup;
  @Input() availability: FormGroup;
  @Output() submitPetsitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();


  get isFormValid() {
    return this.experienceForm.valid && this.availability.valid;
  }

  get availabilityObject(): DateRange<Moment> {
    return new DateRange(this.availability.value?.startDate, this.availability.value?.endDate);
  }

  get pets() {
    return this.experienceForm.get('pets')?.value.sort();
  }

}
