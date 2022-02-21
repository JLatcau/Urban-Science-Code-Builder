import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  //TODO: make api url easily interchangeable between localhost ports
  private url='https://localhost:7112/api/File';
  
  public upload(formData: FormData) {
      return this.http.post('https://localhost:7112/api/File/upload', formData, {
          reportProgress: true,
          observe: 'events',
      });
  }
  
  // public download(fileUrl:string){
  //   return this.http.get('${this.url}/download?fileUrl=${fileUrl}',
  //   {reportProgress:true,
  //   responseType:'blob',}
  //   );
    
  // }
//Retrieving Dashboard files from Resources folder for download
  // public getFiles(){
  //   return this.http.get('${this.url}/getFiles');
  // }
}