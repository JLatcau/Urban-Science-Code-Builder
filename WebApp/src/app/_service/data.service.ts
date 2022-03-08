import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url='https://localhost:7112';

  private imagePath = new BehaviorSubject(this.url);
  currentImagePath = this.imagePath.asObservable();
//TODO: make api url easily interchangeable between localhost portuse on different machines
  constructor(private http: HttpClient) { 
  }

 public changeImagePath(data: string) {
    // data=this.url +"/"+"Resources/"+"Images/"+"upload_test_1t.jpg";
    data=this.url +"/"+data;

    this.imagePath.next(data)
    console.log("service image path: "+this.imagePath.toString());
    return this.http.get(this.url+'/api/UserRequests/addImage?UploadedImagePath='+this.imagePath, {
  });
  console.log("Image should be added here: ");
  }
 
}
