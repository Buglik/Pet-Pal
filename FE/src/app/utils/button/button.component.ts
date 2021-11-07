import {Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'button[petpal-button]',
  exportAs: 'petpal-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  @HostBinding('class.pending')
  pending: boolean = false;

}
