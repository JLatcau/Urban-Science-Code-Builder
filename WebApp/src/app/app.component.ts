import { Component,OnInit, OnDestroy, EventEmitter,HostListener } from '@angular/core';
import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { WebcamImage } from 'ngx-webcam';
import { FileService } from './_service/file.service';
import { DataService } from './_service/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  // Angular page routing animations. The numbers in the transition function correlate to the pages in the application
  animations: [
    trigger('routeAnimation', [
      transition('1 => 3', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('3 => 1', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(-100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ]),
      ]),
      transition('1 => 2', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('2 => 1', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(-100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('2 => 4', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('3 => 4', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('4 => 5', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(-100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ]),
      transition('5 => 1', [
        style({ height: '!'}),
        query(':enter', style({transform: 'translateX(-100%)'})),
        query(':enter, :leave', style({position: 'absolute', top: '0', left: '0', right: '0'})),
        group([
          query(':leave', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(100%)'}))]),
          query(':enter', [animate('0.3s cubic-bezier(.35, 0, .25, 1)', style({transform: 'translateX(0)'}))]),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit,OnDestroy{
  constructor(private fileService: FileService, private data: DataService, private router: Router) { }

  title = 'WebApp';
  webcamImage: WebcamImage | undefined;
  user_id!: string;
  user_IdSubscription!: Subscription;

  ngOnInit(){ 
    this.user_IdSubscription = this.data.currentUser_Id.subscribe(user_id => this.user_id = user_id);
    this.router.navigate(['']);
  }

  // For specefic user instance
  @HostListener('window:beforeunload')
  async ngOnDestroy() {
    var response=this.fileService.deleteUserData(this.user_id).subscribe();

    if (this.user_IdSubscription) {
      this.user_IdSubscription.unsubscribe();
  }
  }
  // Webcam image
  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }
}
