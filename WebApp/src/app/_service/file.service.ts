import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //Web API URL, set in launchsettings.json file of Web API
  private url='https://localhost:7112';
  
  public upload(formData: FormData) {
      return this.http.post(this.url+'/api/File/upload', formData, {
          reportProgress: true,
          observe: 'events',
      });
  }
  
  public download(fileUrl:string, user_id:string){
    return this.http.get(this.url+'/api/File/download?fileUrl='+fileUrl+"&user_id="+user_id,
    {reportProgress:true,
    responseType:'blob',}
    );
    
  }
  public createZip(user_id:string){
    return this.http.get(this.url+'/api/File/createZIP?user_id='+user_id);
  }

  public deleteUserData(user_id: string){
      return this.http.get(this.url+'/api/File/deleteUserData?user_id='+user_id);

  }
}