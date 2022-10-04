import { Component, OnInit } from '@angular/core';
import {filter, interval, map, Observable, tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  intervalle$! : Observable<string>;

  ngOnInit(): void {
    this.intervalle$ = interval(500).pipe(
      filter(value => value%3===0),
      map(value => value % 2 === 0?
          `Je suis ${value} et je suis pair`:
          `Je suis ${value} et je suis impair` ),
      tap(text => this.logger(text))
    );
  }

  logger(text: string): void {
    console.log(`logger: ${text}`);
  }
}
