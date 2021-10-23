import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegisterService} from "../services/register.service";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs/operators";
import {NavigationService} from "../../navigation.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-email-verification-page',
  templateUrl: './email-verification-page.component.html',
  styleUrls: ['./email-verification-page.component.scss']
})
export class EmailVerificationPageComponent implements OnInit, OnDestroy {
  private token: string = '';
  pending: boolean = true;

  private subSink = new Subscription();

  constructor(private route: ActivatedRoute,
              private readonly registerService: RegisterService,
              private readonly navigationService: NavigationService) {
    this.subSink.add(this.registerService.pending$.subscribe(next => this.pending = next))
  }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      this.token = params['token'];
    })
    this.token ? this.registerService.verifyEmail(this.token).subscribe(result => {
      if (result) {
        setTimeout(() => {
          this.navigateToLoginPage();
        }, 5000)
      } else {
        this.navigateToLoginPageError()
      }
    }) : this.navigateToLoginPageError()
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  navigateToLoginPage() {
    this.navigationService.toLoginPage()
  }

  private navigateToLoginPageError() {
    this.navigateToLoginPage();
    //TODO: notification
  }

}
