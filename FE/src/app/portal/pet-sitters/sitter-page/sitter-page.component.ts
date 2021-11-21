import {Component} from '@angular/core';
import {SittersManagementService} from "../sitters-management.service";

@Component({
  selector: 'app-sitter-page',
  templateUrl: './sitter-page.component.html',
  styleUrls: ['./sitter-page.component.scss']
})
export class SitterPageComponent {

  pending$ = this.sitterService.pending$;
  sitter$ = this.sitterService.sitter$;

  constructor(private readonly sitterService: SittersManagementService) {
  }

}
