import { Component, OnInit } from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {FaceSnapsService} from "../services/face-snaps.service";

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

  constructor( private faceSnapService: FaceSnapsService) { }

  ngOnInit(): void {
    this.faceNaps = this.faceSnapService.getAllFaceSnaps();

  }

}
