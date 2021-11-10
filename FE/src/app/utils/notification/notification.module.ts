import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from "./notification.component";
import {NotificationsService} from "./notification.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";


@NgModule({
  declarations: [NotificationComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],
  exports: [NotificationComponent],
  providers: [NotificationsService]
})
export class NotificationModule {
}
