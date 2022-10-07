import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {FaceSnapsService} from "../services/face-snaps.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

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
              private route : ActivatedRoute) {
  }
  ngOnInit(): void {
    this.appreciation="Like ?";
    const facesnapId = +this.route.snapshot.params['id'];
    // this.snapFace = this.snapFaceService.getSnapFaceById(facesnapId);
    this.faceSnap$ = this.snapFaceService.getFaceSnapFromServerById(facesnapId);
  }

  onSnap(){
    if (this.appreciation==="Unliked" || this.appreciation==="Like ?"){
      this.snapFaceService.snapFaceSnapById(this.snapFace.id, 'snap');
      this.appreciation="Liked";
    } else {
      this.snapFaceService.snapFaceSnapById(this.snapFace.id, 'unsnap');
      this.appreciation="Unliked";
    }
  }
  onAddSnap(){
    this.snapFace.snaps++;
  }
}
