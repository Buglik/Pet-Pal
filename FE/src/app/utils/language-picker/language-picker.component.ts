import {Component} from '@angular/core';
import {LanguageService} from "../../language.service";

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent {

  constructor(private readonly lang: LanguageService) {
  }

  changeLang(lang: string) {
    this.lang.setLanguage(lang);
  }

}
