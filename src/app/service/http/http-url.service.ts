import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUrlService {

  httpUrlString:string = 'http://localhost:8888';
  constructor() { }

  httpUrl():string {
    return this.httpUrlString.toLowerCase();
  }
}
