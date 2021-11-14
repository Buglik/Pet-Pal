import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepperIntl} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = 'label.optional';
}

@Component({
  selector: 'app-become-petsitter',
  templateUrl: './become-petsitter.component.html',
  styleUrls: ['./become-petsitter.component.scss'],
  providers: [
    {
      provide: MatStepperIntl,
      useClass: StepperIntl
    },
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false},
  },]
})
export class BecomePetsitterComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
}
