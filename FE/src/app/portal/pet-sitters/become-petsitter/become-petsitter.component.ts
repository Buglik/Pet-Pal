import {Component, Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper, MatStepperIntl} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {Observable} from "rxjs";
import {MeResponse, PetSitterRequest} from "../../../../api/src";
import {selectUser} from "../../../state/user/user.selectors";
import {Store} from "@ngrx/store";
import {AppState} from "../../../state/app.state";
import {FormDirective} from "../../../utils/form.directive";
import {SittersManagementService} from "../sitters-management.service";

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
export class BecomePetsitterComponent extends FormDirective<PetSitterRequest> {

  experienceFormGroup: FormGroup;
  availability: FormGroup;

  user$: Observable<MeResponse | null> = this.store.select(selectUser);

  constructor(private fb: FormBuilder,
              private store: Store<AppState>,
              private readonly sitterService: SittersManagementService) {
    super();
    this.formInit();
  }

  formInit() {
    this.experienceFormGroup = this.fb.group({
      motivation: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      experience: ['', [
        Validators.required,
        Validators.maxLength(255)
      ]],
      pets: [[], [
        Validators.required
      ]]
    });
    this.availability = this.fb.group({
      startDate: ['', [
        Validators.required
      ]],
      endDate: ['', [
        Validators.required
      ]],
    });
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }

  formToJson(): PetSitterRequest {
    return {
      motivation: this.experienceFormGroup.value.motivation,
      experience: this.experienceFormGroup.value.experience,
      pet_experience: this.experienceFormGroup.value.pets,
      availability_start_date: this.availability.value.startDate.format('YYYY-MM-DD'),
      availability_end_date: this.availability.value.endDate.format('YYYY-MM-DD')
    }
  }

  onSubmit() {
    console.log(this.formToJson())
    this.sitterService.createSitter(this.formToJson());
  }
}
