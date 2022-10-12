import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, tap} from "rxjs";
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
              private fSnapService: FaceSnapsService,
              private router: Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.snapForm = this.formBuilder.group({
        title: [null, Validators.required],
        description: [null, Validators.required],
        // imageURL: [null, Validators.required, Validators.pattern(this.urlRegex)],
        imageURL: [null, Validators.required],
        location: [null]
      }, {
      updateOn: "blur"
    });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0,
        createdDate: new Date(),
        snaps: 3
      }))
    );
  }

  onSubmitForm() :void{
    console.log(this.faceSnapPreview$);
    console.log(this.snapForm.value);
    // this.fSnapService.addFaceSnap(this.snapForm); pareille que celle du dessous
    // this.fSnapService.addFaceSnapForm(this.snapForm.value);
    this.fSnapService.addServerFaceNap(this.snapForm.value).pipe(
      tap(()=> this.router.navigateByUrl('/facesnaps')),
      tap(()=> console.log("requete passée"))
    ).subscribe();

  }

}
