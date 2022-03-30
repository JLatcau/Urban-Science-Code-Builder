import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //TODO: make api url easily interchangeable between localhost portuse on different machines
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
//Retrieving Dashboard folders from WebAPI Resources folder for download
  public getFolders(){
    return this.http.get(this.url+'/api/File/getFolders');
  }
//Retrieving Dashboard files from Web APIResources folder for download
  public getFiles(path: string){
    return this.http.get(this.url+'/api/File/getFiles?path='+path);
  }
  public createZip(user_id:string){
    return this.http.get(this.url+'/api/File/createZIP?user_id='+user_id);
  }
}