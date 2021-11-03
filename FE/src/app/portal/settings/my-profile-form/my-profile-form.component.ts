import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MeResponse, ProfileRequest} from "../../../../api/src";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.scss']
})
export class MyProfileFormComponent implements OnInit {

  @Input() profile?: MeResponse;
  @Output() submit: EventEmitter<ProfileRequest> = new EventEmitter<ProfileRequest>();

  form: FormGroup = this.fb.group({
    first_name: new FormControl(this.profile?.user.first_name, [Validators.required]),
    last_name: new FormControl(this.profile?.user.last_name, [Validators.required]),
    bio: new FormControl(this.profile?.bio, [Validators.required]),
    experience: new FormControl(this.profile?.experience, [Validators.required]),
    city: new FormControl(this.profile?.city, [Validators.required]),
    country: new FormControl(this.profile?.country, [Validators.required])
  });

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.populateForm();
  }

  populateForm(): void {
    this.form.patchValue({
      first_name: this.profile?.user.first_name,
      last_name: this.profile?.user.last_name,
      bio: this.profile?.bio,
      experience: this.profile?.experience,
      city: this.profile?.city,
      country: this.profile?.country
    })
  }

  get firstName(): AbstractControl {
    return this.form.controls['first_name'];
  }


}
