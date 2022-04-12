import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //TODO: make api url easily interchangeable between localhost port use on different machines, port used is curently 

  private url='https://localhost:7112';

  private imagePath = new BehaviorSubject(this.url);
  currentImagePath = this.imagePath.asObservable();
  private downloadPath=new BehaviorSubject("");
  currentDownloadPath=this.downloadPath.asObservable();
  private user_id=new BehaviorSubject("0");
  currentUser_Id=this.user_id.asObservable();

  constructor(private http: HttpClient) { 
  }

 public changeImagePath(data: string) {
    data=this.url +"/"+data;

    this.imagePath.next(data)
    
  }
  public changeDownloadPath(data: string) {
  
    this.downloadPath.next(data)
    
  }

  public changeUser_Id(data: string){
      this.user_id.next(data);
  }

  public addImagePathToDatabase(){
    this.http.get(this.url+'/api/UserRequests/addImage?UploadedImagePath='+this.currentImagePath,{reportProgress:true,
      });
  }

 
}
