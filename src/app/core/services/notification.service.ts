import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  config: MatSnackBarConfig = {
    duration: 1500,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  };

  constructor(public snackBar: MatSnackBar) {
  }

  snackSuccess(msg: string): void {
    this.config['panelClass'] = ['notification', 'snack-success'];
    // @ts-ignore
    this.snackBar.open(msg, '', this.config);
  }

  snackFail(msg: string): void {
    this.config['panelClass'] = ['notification', 'snack-danger'];
    // @ts-ignore
    this.snackBar.open(msg, '', this.config);
  }

}
