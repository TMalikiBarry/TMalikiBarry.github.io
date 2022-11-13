import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../dialogs/confirmation-dialog/confirmation-dialog.component";
import {NotificationService} from "../../../core/services/notification.service";

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;
  faceSnapID?: number;
  currentFaceSnap!: FaceSnap;

  constructor(private formBuilder: FormBuilder,
              private fSnapService: FaceSnapsService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private notif: NotificationService) {
  }

  ngOnInit(): void {

    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageURL: [null, Validators.required],
      location: [null]
    }, {
      updateOn: "blur"
    });

    try {
      this.faceSnapID = +this.route.snapshot.params["id"];
      console.log(this.faceSnapID)
    } catch ({message}) {
      console.log(message);
    }
    if (this.faceSnapID) {
      this.fSnapService.getFaceSnapById(this.faceSnapID).subscribe(
        (value) => {
          console.log(`value suscribed = ${value.description}`);
          this.currentFaceSnap = value;
          this.snapForm.controls['title'].setValue(value.title);
          this.snapForm.controls['description'].setValue(value.description);
          this.snapForm.controls['imageURL'].setValue(value.imageURL);
          this.snapForm.controls['location'].setValue(value.location);
        }
      );
    }

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0,
        createdDate: new Date(),
        snaps: 3
      }))
    );
  }

  onSubmitForm() :void {
    console.log(this.snapForm.value);
    if (this.faceSnapID) {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Update Snap',
          content: `Are you sure you want to modify ${this.currentFaceSnap.title} ?`,
          confirmText: 'Update',
          cancelText: 'Cancel',
          colorAction: 'primary'
        },
        maxWidth: '25rem',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '500ms',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fSnapService.updateFaceSnap(this.faceSnapID!, this.snapForm.value).pipe(
            tap(() => this.router.navigateByUrl('/facesnaps')),
          )
            .subscribe(res => {
              if (res) {
                this.notif.snackSuccess(`${this.currentFaceSnap.title} successfully updated`)
              }
            });
        }
      })


    } else {
      this.fSnapService.addFaceNap(this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps')),
        tap(() => console.log("requete passée"))
      ).subscribe(res => {
        if (res) {
          this.notif.snackSuccess(`${this.currentFaceSnap.title} successfully created`)
        }
      });
    }
  }

  onCancel() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: `Cancel ${this.faceSnapID ? 'Update' : 'Create'} process`,
        content: `Are you sure to cancel ${this.faceSnapID ? 'Update' : 'Create'} process ? You will lose all advancements!!`,
        confirmText: 'Yes, I am',
        cancelText: 'No',
        colorAction: 'accent'
      },
      maxWidth: '25rem'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/facesnaps');
        this.notif.snackSuccess(`${this.faceSnapID ? 'Update' : 'Create'} process successfully aborted`);
      }
    })

  }
}
