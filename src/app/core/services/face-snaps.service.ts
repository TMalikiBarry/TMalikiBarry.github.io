import {Injectable} from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) { }

  getAllFaceSnapsFromServer(): Observable<FaceSnap []>{
    return this.http.get<FaceSnap []>("http://localhost:3000/facesnaps");
  }

  getFaceSnapFromServerById(id: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${id}`);
  }

  snapServerFaceSnapById(id : number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapFromServerById(id).pipe(
      map(faceSnap => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap'? 1:-1),
      })),
      exhaustMap(updatedSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${id}`, updatedSnap))
    );
  }

  addServerFaceNap(formValue: { title: string, description: string, imageURL: string, location?: string }): Observable<FaceSnap>{
    return this.getAllFaceSnapsFromServer().pipe(
      map(faceSnaps => [...faceSnaps].sort((a,b) => a.id -b.id)),
      map(sortedFaceSnaps => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map(previousFaceSnap => ({
        ...formValue,
        id: previousFaceSnap.id +1,
        createdDate: new Date(),
        snaps: 7
      })),
      switchMap(newFaceSnap => this.http.post<FaceSnap>("http://localhost:3000/facesnaps", newFaceSnap))
    );
  }

}
