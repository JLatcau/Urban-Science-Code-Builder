import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url='https://localhost:7112';

  private imagePath = new BehaviorSubject(this.url);
  currentImagePath = this.imagePath.asObservable();
  private downloadPath=new BehaviorSubject("");
  currentDownloadPath=this.downloadPath.asObservable();

//TODO: make api url easily interchangeable between localhost port use on different machines, port used is curently 
  constructor(private http: HttpClient) { 
  }

 public changeImagePath(data: string) {
    // data=this.url +"/"+"Resources/"+"Images/"+"upload_test_1t.jpg";
    data=this.url +"/"+data;

    this.imagePath.next(data)
    console.log("service image path: "+this.imagePath.toString());
    
  }
  public changeDownloadPath(data: string) {
    // data=this.url +"/"+"Resources/"+"Images/"+"upload_test_1t.jpg";
  

    this.downloadPath.next(data)
    console.log("service download path: "+this.downloadPath.toString());
    
  }

public addImagePathToDatabase(){
   this.http.get(this.url+'/api/UserRequests/addImage?UploadedImagePath='+this.currentImagePath,{reportProgress:true,
    });
}

 
}
