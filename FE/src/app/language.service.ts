import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languageChange$ = this.translateService.onLangChange;

  constructor(private readonly translateService: TranslateService) {
    this.translateService.addLangs(['pl', 'en', 'es', 'it']);
    this.translateService.setDefaultLang('en');
    const lang = localStorage.getItem('petpal-currentLang');
    const browserLang = this.translateService.getBrowserLang()
    if (lang) {
      this.setLanguage(lang);
    } else if (browserLang) {
      this.setLanguage(browserLang);
    }
    localStorage.setItem('petpal-currentLang', this.translateService.currentLang);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang).pipe(take(1))
      .subscribe(_ => localStorage.setItem('petpal-currentLang', this.translateService.currentLang));
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }
}
