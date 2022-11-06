import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {FaceSnapComponent} from "./components/face-snap/face-snap.component";
import {FaceSnapListComponent} from "./components/face-snap-list/face-snap-list.component";
import {NewFaceSnapComponent} from "./components/new-face-snap/new-face-snap.component";
import {SingleFaceSnapComponent} from "./components/single-face-snap/single-face-snap.component";
import {FaceSnapsRoutingModule} from "./face-snaps-routing.module";
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FaceSnapComponent,
    FaceSnapListComponent,
    NewFaceSnapComponent,
    SingleFaceSnapComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    FaceSnapsRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],

})
export class FaceSnapsModule {
}
