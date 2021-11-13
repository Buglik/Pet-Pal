import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private readonly translateService: TranslateService) {
    this.translateService.addLangs(['pl', 'en']);
    this.translateService.setDefaultLang('en');
    const browserLang = this.translateService.getBrowserLang()
    if (browserLang) this.setLanguage(browserLang);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
