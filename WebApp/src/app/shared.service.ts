import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
//API URL
readonly APIURL='https://localhost:7112/api';
  constructor(private http:HttpClient) { 
    
  }
}
