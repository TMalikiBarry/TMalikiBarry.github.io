import {Component, OnInit} from '@angular/core';
import {FaceSnap} from "../../../core/models/face-snap";
import {FaceSnapsService} from "../../../core/services/face-snaps.service";
import {map, Observable} from "rxjs";

interface ViewHandling {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {

  faceSnaps$!: Observable<FaceSnap[]>;
  searchValue: string = '';
  filterBy: string = '';

  filterReferenceList: ViewHandling[] = [
    {value: 'title', viewValue: 'Titre'},
    {value: 'location', viewValue: 'Localisaion'},
    {value: 'snaps', viewValue: 'Nombre de Like'},
    {value: 'description', viewValue: 'Description'},
    {value: 'createdDate', viewValue: 'Date de création'},
  ];

  constructor(private faceSnapService: FaceSnapsService) {
  }

  ngOnInit(): void {
    this.getFaceSnaps();
  }

  onSearch() {
    if (this.searchValue === '' || this.filterBy === '') {
      this.getFaceSnaps();
      return;
    }

    this.faceSnaps$ = this.faceSnaps$.pipe(
      map((faceSnaps) => faceSnaps.filter(fSnap => {
        if (this.filterBy === 'location') {
          return fSnap[this.filterBy]?.toLowerCase() === this.searchValue.toLowerCase() ? fSnap : null;
        } else if (this.filterBy === 'title' || this.filterBy === 'description') {
          return fSnap[this.filterBy]?.toLowerCase().includes(this.searchValue.toLowerCase()) ? fSnap : null;
        } else if (this.filterBy === 'snaps') {
          let snaps = +this.searchValue;
          return fSnap[this.filterBy] <= snaps ? fSnap : null;
        }
        return null;
      })),
    );

    console.log(` Valeur de recherche ${this.searchValue} ---- Valeur de filtrage ${this.filterBy}`)
  }

  getFaceSnaps() {
    this.faceSnaps$ = this.faceSnapService.getAllFaceSnaps();
  }

}
