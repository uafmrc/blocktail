import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Http2ServerRequest } from 'http2';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

export class element {
  name: string;
  username: string;
  guid: string;
}

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  Element:element[];
  constructor(public http:HttpClient, private url:HttpUrlService) { 
    
    this.retrieveData();
  }

  ngOnInit(): void {
  }

  retrieveData() {
    this.http.get<any>(this.url.httpUrl() + "/server/api/function/function-api.php?request=list").subscribe(res => {
      this.Element = res;
    });
  }
  

}
