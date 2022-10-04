export class FaceSnap {
  constructor(public id: number,
              public title: string,
              public description: string,
              public imageURL: string,
              public createdDate: Date,
              public snaps: number,
              public location? : string) {
  }
}
