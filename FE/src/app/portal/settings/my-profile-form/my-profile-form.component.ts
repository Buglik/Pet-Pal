import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MeResponse, ProfileRequest} from "../../../../api/src";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormDirective} from "../../../utils/form.directive";

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.scss']
})
export class MyProfileFormComponent extends FormDirective<ProfileRequest> implements OnChanges {

  @Input() profile: MeResponse | null = null;

  // TODO: change form data after model change
  form: FormGroup = this.fb.group({
    user: new FormGroup({
      first_name: new FormControl(this.profile?.user.first_name, [
        Validators.required,
        Validators.maxLength(200)
      ]),
      last_name: new FormControl(this.profile?.user.last_name, [
        Validators.required,
        Validators.maxLength(200)
      ]),
    }),
    bio: new FormControl(this.profile?.bio, [
      Validators.maxLength(255)
    ]),
    experience: new FormControl(this.profile?.experience, [
      Validators.maxLength(255)
    ]),
    city: new FormControl(this.profile?.city, [
      Validators.maxLength(255)
    ]),
    country: new FormControl(this.profile?.country, [
      Validators.maxLength(255)
    ])
  });

  constructor(private readonly fb: FormBuilder) {
    super()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile) {
      this.populateForm();
    }
  }

  populateForm(): void {
    this.form.patchValue({
      user: {
        first_name: this.profile?.user.first_name,
        last_name: this.profile?.user.last_name,
      },
      bio: this.profile?.bio,
      experience: this.profile?.experience,
      city: this.profile?.city,
      country: this.profile?.country
    })
  }

  formToJson(): ProfileRequest {
    return this.form.value;
  }

  get firstName() {
    return this.form.get('user.first_name');
  }

  get lastName() {
    return this.form.get('user.last_name');
  }

  get bio(): AbstractControl {
    return this.form.controls['bio'];
  }

}
