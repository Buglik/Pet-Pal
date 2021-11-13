import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from "./notification.component";
import {NotificationService} from "./notification.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [NotificationComponent],
    imports: [
        CommonModule,
        MatSnackBarModule,
        TranslateModule,
    ],
  exports: [NotificationComponent],
  providers: [NotificationService]
})
export class NotificationModule {
}
