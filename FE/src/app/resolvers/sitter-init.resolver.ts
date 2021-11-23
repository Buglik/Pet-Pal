import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {SittersManagementService} from "../portal/pet-sitters/sitters-management.service";
import {NavigationService} from "../navigation.service";

@Injectable({
  providedIn: 'root'
})
export class SitterInitResolver implements Resolve<boolean> {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private navigationService: NavigationService,
              private readonly sitterService: SittersManagementService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    const sitter = this.router.getCurrentNavigation()?.extras.state;

    if (!sitter) {
      const username = route.paramMap.get('username')
      username ? this.sitterService.getSitterByUsername(username) : this.navigationService.back();
    }
    return of(true);
  }
}
