import {Component, Input, OnDestroy} from '@angular/core';
import {LanguageService} from "../../language.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnDestroy {
  //ngx-flag-picker doesn't have 'en' flag -> gb instead
  @Input() showArrow: boolean = false;
  private subSink = new Subscription();

  selectedCountryCode = this.languageService.getCurrentLang() === 'en' ? 'gb' : this.languageService.getCurrentLang();
  countryCodes = ['gb', 'pl', 'es', 'it'];

  changeSelectedCountryCode(value: string): void {
    this.languageService.setLanguage(value === 'gb' ? 'en' : value);
    this.selectedCountryCode = value;
  }

  constructor(private readonly languageService: LanguageService) {
    this.subSink.add(this.languageService.languageChange$
      .subscribe(next => this.selectedCountryCode = next.lang === 'en' ? 'gb' : next.lang))
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

}
