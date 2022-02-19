import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

class User {
  id:string;
  username:string;
  email:string;
  password:string;
}

export interface ElementNFT {
  max_piece: string;
  description:string;
  name: string;
  date_created: string;
  status: string;
  guid: string;
}

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css']
})
export class CollectComponent implements OnInit {

  cards:ElementNFT[];
  chkEmail:string;
  user:User;
  displayedColumns: string[] = ['piece','name', 'date_created', 'actions'];
  dataSource:any;

  constructor(public router:Router, public http:HttpClient, public cookie:CookieService, public url:HttpUrlService, public _auth:AuthService) {
    this._auth.checkLogin();
    this.user = new User;
    let id = this.cookie.get('blktl_id');
    if(id == null || id == undefined || id == '') {
      this.router.navigate(["login"]);
    }
    this.readUser(id);
    this.retrieveData(this.user.id);
   }

  ngOnInit(): void {
  }

  async readUser(id:string) {
    this.http.post<any>(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
            "request": "readUser",
            "id": id
          })).subscribe(res => {
            if(res != null) {
              this.retrieveData(res.id);
              this.user.email = res.email;
              this.user.username = res.username;
              this.user.password = res.password;
            } else { }
          });
  }

  async retrieveData(guid:string) {
    this.http.post<ElementNFT>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
      "request": "readnft",
      "guid": guid
    })).subscribe(res => {
      if(res != null) {
        this.dataSource = res;
      } else {  }
    });
  }

  async clickGoItem(event:string,guid:string) {
    if(event == '0') { this.router.navigate(['../buildnft/' + guid]) }
    else if(event == '1') { this.router.navigate(['../item/' + guid]) } 
  }

  async DeleteData(guid:string) {
    this.http.post<any>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
      "request": "delete",
      "guid": guid
    })).subscribe(res => {
      if(res.result != 'OK') {
        location.reload();
      } else {  }
    });
  }

}
