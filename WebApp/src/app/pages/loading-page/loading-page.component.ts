import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading-page',
  templateUrl: './loading-page.component.html',
  styleUrls: ['./loading-page.component.css']
})
export class LoadingPageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
      // do init at here for current route.

      //For demonstration purposes
      setTimeout(() => {
          this.router.navigate(['download']);
      }, 15000);  //15s
  }
}
