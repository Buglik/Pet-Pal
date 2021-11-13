import {Component} from '@angular/core';
import {LanguageService} from "./language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FE';

  constructor(private readonly translateService: LanguageService) {
  }
}
