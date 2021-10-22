import {Component} from '@angular/core';
import {RegisterRequest} from "../../../api/src";
import {RegisterService} from "../services/register.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private registerService: RegisterService) {
  }

  pending$ = this.registerService.pending$;

  registerUser(registerData: RegisterRequest) {
    this.registerService.registerUser(registerData);
  }

}
