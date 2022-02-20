import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  public upload(formData: FormData) {
      return this.http.post('https://localhost:4200/api/file/upload', formData, {
          reportProgress: true,
          observe: 'events',
      });
  }
  
  public download(){
    return this.http.get('https://localhost:4200/api/file/download', {});
  }
}
