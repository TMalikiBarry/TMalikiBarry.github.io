import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  config: MatSnackBarConfig = {
    duration: 2000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  constructor(public snackBar: MatSnackBar) {
  }

  snackSuccess(msg: string): void {
    this.config['panelClass'] = ['notification', 'snack-success'];
    this.snackBar.open(msg, '', this.config);
  }

  snackWarn(msg: string): void {
    this.config['panelClass'] = ['notification', 'snack-danger'];
    this.snackBar.open(msg, '', this.config);
  }

}
