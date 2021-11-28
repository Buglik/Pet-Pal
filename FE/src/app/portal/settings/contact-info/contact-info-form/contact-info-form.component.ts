import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MeResponse, ProfileRequest} from "../../../../../api/src";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FormDirective} from "../../../../utils/form.directive";

@Component({
  selector: 'app-contact-info-form',
  templateUrl: './contact-info-form.component.html',
  styleUrls: ['./contact-info-form.component.scss']
})
export class ContactInfoFormComponent extends FormDirective<ProfileRequest> implements OnChanges {

  @Input() profile: MeResponse | null = null;

  form: FormGroup = this.fb.group({
    contact: new FormGroup({
      city: new FormControl(this.profile?.contact.city, [
        Validators.maxLength(255)
      ]),
      country: new FormControl(this.profile?.contact.city, [
        Validators.maxLength(255)
      ]),
      whatsapp_number: new FormControl(this.profile?.contact.city, [
        Validators.maxLength(255)
      ]),
      phone_number: new FormControl(this.profile?.contact.city, [
        Validators.maxLength(255)
      ]),
    })

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
      contact: {
        city: this.profile?.contact.city,
        country: this.profile?.contact.country,
        whatsapp_number: this.profile?.contact.whatsapp_number,
        phone_number: this.profile?.contact.phone_number
      }
    })
  }

  formToJson(): ProfileRequest {
    return {
      // @ts-ignore
      user: this.profile.user,
      bio: this.profile?.bio,
      contact: this.form.value.contact,
    };
  }

  get city() {
    return this.form.get('contact.city');
  }

  get country() {
    return this.form.get('contact.country');
  }

  get whatsapp_number() {
    return this.form.get('contact.whatsapp_number');
  }

  get phone_number() {
    return this.form.get('contact.phone_number');
  }


}
