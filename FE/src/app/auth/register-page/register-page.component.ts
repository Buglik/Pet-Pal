import {Component} from '@angular/core';
import {RegisterRequest} from "../../../api/src";
import {RegisterService} from "../services/register.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  pending$: Observable<boolean> = this.registerService.pending$;
  error$: Observable<any> = this.registerService.error$;

  constructor(private registerService: RegisterService) {
  }


  registerUser(registerData: RegisterRequest) {
    this.registerService.registerUser(registerData);
  }

}
