import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private token: string = 'MyFakeToken';

  getToken(): string{
    return this.token;
  }
}
