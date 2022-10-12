import { Component, OnInit } from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {

  /*mySnap! : FaceSnap;
  middleSnap! : FaceSnap;
  lastSnap! : FaceSnap;*/
  faceNaps!: FaceSnap[];
  faceSnaps$!: Observable<FaceSnap[]>;

  constructor( private faceSnapService: FaceSnapsService) { }

  ngOnInit(): void {
    // this.faceNaps = this.faceSnapService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnapsFromServer();

  }

}
