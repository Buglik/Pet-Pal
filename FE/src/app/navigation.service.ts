import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private history: string[] = []

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.urlAfterRedirects);
        this.history.push(event.urlAfterRedirects)
      }
    })
  }

  back() {
    let item = this.history.pop()
    while (item?.includes('auth')) {
      console.log(item)
      item = this.history.pop();
    }
    if (item) {
      this.router.navigateByUrl(item)
    } else {
      this.toMainPage()
    }
  }

  toLoginPage() {
    this.router.navigateByUrl('/auth/login')
  }

  toRegister() {
    this.router.navigateByUrl('/auth/register')
  }

  toMainPage() {
    this.router.navigateByUrl('/');
  }

  toSitterPage(username?: string) {
    this.router.navigateByUrl('/pet-sitters/sitter/' + username)
  }

  toProfilePage(username?: string) {
    this.router.navigateByUrl('/profiles/user/' + username)
  }

  toBecomeSitter() {
    this.router.navigateByUrl('/pet-sitters/become-sitter');
  }

  toSitterList() {
    this.router.navigateByUrl('/pet-sitters');
  }

}
