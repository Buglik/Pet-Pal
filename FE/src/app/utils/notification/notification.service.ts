import {Injectable} from '@angular/core';
import {NotificationComponent} from "./notification.component";
import {MatSnackBar} from "@angular/material/snack-bar";

export const DEFAULT_NOTIFICATION_TIMEOUT = 5000;

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) {
  }

  error(message: string, noTimeout: boolean = false): void {
    this.openNotification(message, 'notification-error', noTimeout);
  }

  info(message: string, noTimeout: boolean = false): void {
    this.openNotification(message, 'notification-info', noTimeout);
  }

  warning(message: string, noTimeout: boolean = false): void {
    this.openNotification(message, 'notification-warning', noTimeout);
  }

  success(message: string, noTimeout: boolean = false): void {
    this.openNotification(message, 'notification-success', noTimeout);
  }

  private openNotification(message: string, notificationClass: string, noTimeout: boolean): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
      },
      duration: noTimeout ? undefined : DEFAULT_NOTIFICATION_TIMEOUT,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: ['notification', notificationClass],
    });
  }
}
