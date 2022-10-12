import { Injectable } from '@angular/core';
import {FaceSnap} from "../models/face-snap";
import {FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {exhaustMap, map, Observable, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {

  constructor(private http: HttpClient) { }

  //########################## Static Methods ######################

  faceNaps: FaceSnap[] = [];
    /*[
    // this.mySnap =
    new FaceSnap(
      1,
      "Poulet fumé",
      "Plat sénégalais succulent, mais importé de la Guinée. Riche en proteins, lipides et sels minéraux",
      "https://gourmand.viepratique.fr/wp-content/uploads/sites/2/2014/02/poulet-vin-blanc-492x410.jpg",
       new Date(),
      20,
      "Senegal"
    ),
    // this.middleSnap =
    new FaceSnap(
      2,
      "SandWich au poulet",
      "Le yassa est un plat d’origine sénégalaise à base d'oignons frits et de riz et qui peut être " +
      "accompagné de viande marinée dans le citron puis frite ou braisée, de poulet ou de poisson. C'est un plat simple, " +
      "rapide à faire et souvent apprécié de tous grâce à ses ingrédients de base simples et économiques.",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Chicken_salad_sandwich_01.jpg/1024px-" +
      "Chicken_salad_sandwich_01.jpg",
       new Date(),
      10
    ),
    // this.lastSnap =
    new FaceSnap(
      3,
      "Voyage nature",
      "Pour profiter des grands espaces et respirer un bol d'air pur, privilégiez les destinations nature." +
      "En Europe, au Canada ou ailleurs, des paysages préservés vous attendent dans des parcs, forêts, lacs ou villages " +
      "lors de ce voyage nature." +
      "Loin de l’agitation des grandes villes et du tourisme de masse, un voyage nature permet aux voyageurs de se " +
      "ressourcer au calme et de découvrir de sublimes sites naturels : parcs nationaux, montagnes, lacs, campagnes...",
      "https://img-4.linternaute.com/1HLz3U4BnxeTuogeT2ohh0rXpqg=/660x366/smart/ba2a84927212477aa4dd23001" +
      "9ffd66f/ccmcms-linternaute/11298652.jpg",
       new Date(),
      7,
      "Gambie"
    ),
    new FaceSnap(
      4,
      'Three Rock Mountain',
      'Un endroit magnifique pour les randonnées.',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
       new Date(),
      23,
      "Somalie"
    ),
    new FaceSnap(
      5,
      'Archibald',
      'Mon meilleur ami depuis tout petit !',
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
       new Date(),
      0
    )
  ];*/

  getAllFaceSnaps(): FaceSnap[]{
    return this.faceNaps;
  }

  addFaceSnap(formValue: FormGroup){
    const fSnap = new FaceSnap(
      this.faceNaps[this.faceNaps.length - 1].id + 1,
      formValue.value.title,
      formValue.value.description,
      formValue.value.imageURL,
      new Date(),
      4,
      formValue.value.location
    );

    this.faceNaps.push(fSnap);
  }

  addFaceSnapForm(formValue: { title: string, description: string, imageURL: string, location?: string }){
    const fSnap = new FaceSnap(
      this.faceNaps[this.faceNaps.length - 1].id + 1,
      formValue.title,
      formValue.description,
      formValue.imageURL,
      new Date(),
      4,
      formValue.location
    );

    this.faceNaps.push(fSnap);
  }

  getSnapFaceById(id: number):FaceSnap{
    const fSnap = this.faceNaps.find(faceSnap => faceSnap.id===id);
    if (!fSnap){
      throw new Error('Invalid FaceSnap');
    } else {
      return fSnap;
    }
  }
  snapFaceSnapById(id : number, type: 'snap' | 'unsnap') : void{
    const fSnap = this.getSnapFaceById(id);
    type == 'snap' ? fSnap.snaps++ : fSnap.snaps--;

  }


  // ############################## Server Side Methods ################################

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


// ############################ Others Methods ##########################


/*
    Si ma classe n'avait aucun constructeur par exemple
    export class FaceSnap {
      title!: string;
      description!: string;
      imageUrl!: string;
      createdDate!: Date;
      snaps!: number;
      location?: string;
    }
    this.mySnap = {
      title: 'Archibald',
      description: 'Mon meilleur ami depuis tout petit !',
      imageUrl: 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      createdDate: new Date(),
      snaps: 0
    };
    this.myOtherSnap = {
      title: 'Three Rock Mountain',
      description: 'Un endroit magnifique pour les randonnées.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Three_Rock_Mountain_Southern_Tor.jpg/2880px-Three_Rock_Mountain_Southern_Tor.jpg',
      createdDate: new Date(),
      snaps: 0
    };
    this.myLastSnap = {
      title: 'Un bon repas',
      description: 'Mmmh que c\'est bon !',
      imageUrl: 'https://wtop.com/wp-content/uploads/2020/06/HEALTHYFRESH.jpg',
      createdDate: new Date(),
      snaps: 0
    };*/
