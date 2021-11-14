import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper, MatStepperIntl} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Observable} from "rxjs";
import {MeResponse} from "../../../../api/src";
import {selectUser} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";

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
      useValue: {
        showError: true,
        displayDefaultIndicatorType: false
      },
    },]
})
export class BecomePetsitterComponent implements OnInit {

  experienceFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  user$: Observable<MeResponse | null> = this.store.select(selectUser);

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
  }

  ngOnInit() {
    this.experienceFormGroup = this.fb.group({
      motivation: ['', [
        Validators.required,
        Validators.maxLength(255)]
      ],
      experience: ['', [
        Validators.required,
        Validators.maxLength(255)]
      ],
      pets: [[], [
        Validators.required
      ]]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required],
    });
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

}
