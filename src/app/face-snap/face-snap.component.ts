import { Component, OnInit, Input } from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {FaceSnapsService} from "../services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit{

  @Input() snapFace!: FaceSnap;

  appreciation!: string;

  constructor(private snapFaceService: FaceSnapsService, private router : Router) {
  }
  ngOnInit(): void {
    this.appreciation="Like ?";
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


  onViewFSnap() {
    this.router.navigateByUrl(`facesnaps/${this.snapFace.id}`);
  }
}
