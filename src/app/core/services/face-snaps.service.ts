import {Injectable} from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) {
  }

  getAllFaceSnaps(): Observable<FaceSnap []> {
    return this.http.get<FaceSnap []>("http://localhost:3000/facesnaps");
  }

  getFaceSnapById(id: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${id}`);
  }

  snapFaceSnapById(id: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(id).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      exhaustMap(updatedSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${id}`, updatedSnap))
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
      switchMap(newFaceSnap => this.http.post<FaceSnap>("http://localhost:3000/facesnaps", newFaceSnap))
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
      exhaustMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${updatedFaceSnap.id}`, updatedFaceSnap))
    );
  }

  deleteFaceSnap(id: number): Observable<FaceSnap> {
    return this.http.delete<FaceSnap>(`http://localhost:3000/facesnaps/${id}`);
  }


}
