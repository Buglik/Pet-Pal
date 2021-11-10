import {Component, OnInit} from '@angular/core';
import {RegisterService} from "../services/register.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import {NavigationService} from "../../navigation.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.scss']
})
export class EmailVerificationPageComponent implements OnInit {
  private token: string = '';
  pending$: Observable<boolean> = this.registerService.pending$;
  secondsLeft: number = 5;

  constructor(private route: ActivatedRoute,
              private readonly registerService: RegisterService,
              private readonly navigationService: NavigationService) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.token = params['token'];
    })
    this.token ? this.registerService.verifyEmail(this.token).subscribe(result => {
      if (result) {
        const interval = setInterval(() => {
          console.log(this.secondsLeft)
          this.secondsLeft = this.secondsLeft - 1;
        }, 1000)
        setTimeout(() => {
          this.navigateToLoginPage();
          clearInterval(interval);
        }, 5000)
      } else {
        this.navigateToLoginPageError()
      }
    }) : this.navigateToLoginPageError()
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage()
  }

  private navigateToLoginPageError() {
    this.navigateToLoginPage();
  }

}
