import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, Observable, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit {

  snapFace!: FaceSnap;

  faceSnap$!: Observable<FaceSnap>;

  appreciation!: string;

  constructor(private snapFaceService: FaceSnapsService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private notif: NotificationService) {
  }

  ngOnInit(): void {
    this.appreciation = "Like ?";
    const facesnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.snapFaceService.getFaceSnapById(facesnapId).pipe(
      map(value => this.snapFace = value),
    );
  }

  onSnap(id : number){
    if (this.appreciation==="Unliked" || this.appreciation==="Like ?"){
      this.faceSnap$ = this.snapFaceService.snapFaceSnapById(id, 'snap')
        .pipe(
          tap(() => this.appreciation = "Liked"),
          tap(() => this.notif.snackSuccess(`${this.snapFace.title} LIKED`)),
        );
    } else {
      this.faceSnap$ = this.snapFaceService.snapFaceSnapById(id, 'unsnap')
        .pipe(
          tap(() => this.appreciation = "Unliked"),
          tap(() => this.notif.snackFail(`${this.snapFace.title} DISLIKED`)),
        );
    }
  }

  onDeleteSnap(id: number) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Snap',
        content: `Are you sure you want to delete ${this.snapFace.title} ?`,
        confirmText: 'Delete',
        cancelText: 'Cancel',
        colorAction: 'warn'
      },
      maxWidth: '25rem',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '500ms',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snapFaceService.deleteFaceSnap(id).pipe(
          tap(() => this.router.navigateByUrl('/facesnaps'))
        )
          .subscribe(
            res => {
              if (res) {
                this.notif.snackFail(`${this.snapFace.title} successfully deleted`)
              }
            }
          )
      }
    })


  }
}
