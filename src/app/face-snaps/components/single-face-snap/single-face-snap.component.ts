import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, tap} from "rxjs";

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
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.appreciation="Like ?";
    const facesnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.snapFaceService.getFaceSnapById(facesnapId);
  }

  onSnap(id : number){
    if (this.appreciation==="Unliked" || this.appreciation==="Like ?"){
      this.faceSnap$ = this.snapFaceService.snapFaceSnapById(id, 'snap')
        .pipe(
          tap(() => this.appreciation = "Liked")
        );
    } else {
      this.faceSnap$ = this.snapFaceService.snapFaceSnapById(id, 'unsnap')
        .pipe(
          tap(() => this.appreciation = "Unliked")
        );
    }
  }

  onDeleteSnap(id: number) {
    this.snapFaceService.deleteFaceSnap(id).pipe(
      tap(() => this.router.navigateByUrl('/facesnaps'))
    )
      .subscribe()
  }

  onAddSnap() {
    this.snapFace.snaps++;
  }
}
