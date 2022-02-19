import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { HttpUrlService } from '../service/http/http-url.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  cook:string;
  ipAddress:string;
  token:string;
  client:string;

  constructor(private cookie:CookieService, private http:HttpClient, public url:HttpUrlService) {
    this.getIPaddress();
  }

  checkLogin():any {
    this.client = this.cookie.get('blktl_id');
    this.token = this.cookie.get('blktl_chk');
    this.http.post<any>(this.url.httpUrl() + "/server/api/auth/auth-api.php", JSON.stringify({
      "request": "check",
      "key": this.token,
      "address": this.ipAddress,
      "user": this.client
    })).subscribe(res => {
      if(res.result == "503") {
        localStorage.clear();
        this.cookie.deleteAll();
        window.location.replace('');
        return false;
      } else { return true;}
    });
    
  }

  getIPaddress() {
    this.http.get("http://api.ipify.org/?format=text", {responseType:'text'}).subscribe(res => {
      localStorage.setItem('address', res);
    });
    this.ipAddress = localStorage.getItem('address') ?? '';
    if(this.ipAddress != null || this.ipAddress != '' ) {
      localStorage.removeItem('address');
    }
  }

  

}
