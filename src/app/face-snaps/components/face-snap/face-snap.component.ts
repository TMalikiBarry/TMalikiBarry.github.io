import {Component, Input, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-face-snap',
  templateUrl: './face-snap.component.html',
  styleUrls: ['./face-snap.component.scss']
})
export class FaceSnapComponent implements OnInit{

  @Input() snapFace!: FaceSnap;

  appreciation!: string;

  constructor(private snapFaceService: FaceSnapsService, private router: Router) {
  }

  ngOnInit(): void {
    this.appreciation = "Like ?";
  }

  onUpdateFaceSnap() {
    this.router.navigateByUrl(`facesnaps/update/${this.snapFace.id}`);
  }

  onViewFSnap() {
    this.router.navigateByUrl(`facesnaps/${this.snapFace.id}`);
  }
}
