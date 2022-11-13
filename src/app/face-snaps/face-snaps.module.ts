import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FaceSnapComponent} from "./components/face-snap/face-snap.component";
import {FaceSnapListComponent} from "./components/face-snap-list/face-snap-list.component";
import {NewFaceSnapComponent} from "./components/new-face-snap/new-face-snap.component";
import {SingleFaceSnapComponent} from "./components/single-face-snap/single-face-snap.component";
import {FaceSnapsRoutingModule} from "./face-snaps-routing.module";
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";

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
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],

})
export class FaceSnapsModule {
}
