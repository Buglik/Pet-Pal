import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

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
    this.translateService.use(lang);
    localStorage.setItem('petpal-currentLang', this.translateService.currentLang);
    console.log(this.translateService.currentLang)
  }

  getCurrentLang(): string {
    return this.translateService.currentLang;
  }
}
