import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-email-verification-form',
  templateUrl: './email-verification-form.component.html',
  styleUrls: ['./email-verification-form.component.scss']
})
export class EmailVerificationFormComponent {

  @Input() seconds: number;
  @Output() redirect: EventEmitter<void> = new EventEmitter<void>();

}
