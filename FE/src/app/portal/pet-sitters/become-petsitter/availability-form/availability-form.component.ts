import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Moment} from "moment/moment";
import * as moment from "moment";

@Component({
  selector: 'app-availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.scss'],
})
export class AvailabilityFormComponent {

  today: Moment = moment();

  @Input() form: FormGroup;
  @Output() formChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() goNext: EventEmitter<void> = new EventEmitter<void>();
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  updateForm(item: any) {
    console.log(item);
    this.form.setValue(item);
    this.form.updateValueAndValidity();
  }
}
