import {Injectable} from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, map, Observable, switchMap} from "rxjs";
import {environment} from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {


  constructor(private http: HttpClient) {
  }

  getAllFaceSnaps(): Observable<FaceSnap []> {
    return this.http.get<FaceSnap []>(environment.apiURL);
  }

  getFaceSnapById(id: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`${environment.apiURL}/${id}`);
  }

  snapFaceSnapById(id: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(id).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      exhaustMap(updatedSnap => this.http.put<FaceSnap>(`${environment.apiURL}/${id}`, updatedSnap))
    );
  }

  addFaceNap(formValue: { title: string, description: string, imageURL: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(faceSnaps => [...faceSnaps].sort((a, b) => a.id - b.id)),
      map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map(previousFaceSnap => ({
        id: previousFaceSnap.id + 1,
        ...formValue,
        createdDate: new Date(),
        snaps: 7
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>(environment.apiURL, newFaceSnap))
    );
  }

  updateFaceSnap(id: number, formValue: { title: string, description: string, imageURL: string, location?: string }): Observable<FaceSnap> {
    return this.getFaceSnapById(id).pipe(
      map(faceSnapToUpdate => ({
        id: faceSnapToUpdate.id,
        ...formValue,
        createdDate: faceSnapToUpdate.createdDate,
        snaps: faceSnapToUpdate.snaps
      })),
      exhaustMap(updatedFaceSnap => this.http.put<FaceSnap>(`${environment.apiURL}/${updatedFaceSnap.id}`, updatedFaceSnap))
    );
  }

  deleteFaceSnap(id: number): Observable<FaceSnap> {
    return this.http.delete<FaceSnap>(`${environment.apiURL}/${id}`);
  }


}
