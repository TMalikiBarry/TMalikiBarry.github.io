import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  // faceSnap$?: Observable<FaceSnap>;
  faceSnapID?: number;
  currentFaceSnap?: FaceSnap;

  constructor(private formBuilder: FormBuilder,
              private fSnapService: FaceSnapsService,
              private router: Router,
              private route: ActivatedRoute) {
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
          this.snapForm.controls['title'].setValue(value.title);
          this.snapForm.controls['description'].setValue(value.description);
          this.snapForm.controls['imageURL'].setValue(value.imageURL);
          this.snapForm.controls['location'].setValue(value.location);
          /*this.currentFaceSnap = new FaceSnap(
            value.id,
            value.title,
            value.description,
            value.imageURL,
            value.createdDate,
            value.snaps,
            value?.location
          );
          console.log(`snapface created = ${this.currentFaceSnap.createdDate}`);*/
        }
      );
    }
    console.log(this.currentFaceSnap);

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
      this.fSnapService.updateFaceSnap(this.faceSnapID, this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps')),
      )
        .subscribe();
    } else {
      this.fSnapService.addFaceNap(this.snapForm.value).pipe(
        tap(() => this.router.navigateByUrl('/facesnaps')),
        tap(() => console.log("requete passée"))
      ).subscribe();
    }


  }

  onCancel() {
    this.router.navigateByUrl('/facesnaps');
  }
}
