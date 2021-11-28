import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MeResponse, ReviewRequest} from "../../../../../api/src";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReviewService} from "../../review.service";
import {MatChip} from "@angular/material/chips";
import {EnumService, SelectOption} from "../../../../utils/enum.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {

  form: FormGroup;
  petOptions: SelectOption<string>[] = this.enumService.getPetsSelectOptions();

  pending$: Observable<boolean> = this.reviewService.pending$;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private enumService: EnumService,
    @Inject(MAT_DIALOG_DATA) public data: { profile: MeResponse }) {
    this.form = this.fb.group({
      description: new FormControl('', [
        Validators.maxLength(255)]),
      score: new FormControl('', [
        Validators.min(1),
        Validators.max(5),
        Validators.required]),
      pets_involved: [[], [
        Validators.required
      ]]
    })
  }


  onSubmit() {
    const requestData: ReviewRequest = this.form.value;
    this.reviewService.addReview(requestData, this.data.profile.user.username);
  }

  get score() {
    return this.form.get('score') as FormControl;
  }

  get pets() {
    return this.form.get('pets_involved');
  }

  // Quick but nasty solution
  toggleSelection(chip: MatChip, val: string) {
    const result = chip.toggleSelected();
    if (result && !this.pets?.value.includes(val)) {
      this.pets?.value.push(val);
    } else if (this.pets?.value.includes(val)) {
      const index = this.pets?.value.indexOf(val);
      if (index !== -1) {
        this.pets?.value.splice(index, 1);
      }
    }
    this.pets?.updateValueAndValidity();
  }

}
