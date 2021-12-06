import {Component} from '@angular/core';
import {NavigationService} from "../../navigation.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  constructor(private readonly navigationService: NavigationService) {
  }

  navigateToSittersPage(){
    this.navigationService.toSitterList();
  }
}

