import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  emailInput: string = "myemail@news.snap";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRedirect():void {
    this.router.navigateByUrl("facesnaps");
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
