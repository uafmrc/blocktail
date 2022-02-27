import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpUrlService {

  httpUrlString:string = 'https://runtime.madshaker.it';
  constructor() { }

  httpUrl():string {
    return this.httpUrlString.toLowerCase();
  }
}
