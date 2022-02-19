import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

export interface UserData {
  id:string,
  name:string,
  values:string
}

export class nft {
  name:string;
  description:string;
  username:string;
  properties:UserData[];
  max_piece:string;
  guid:string;
  date_created:string;
}

let ELEMENT_DATA: UserData[] = [

]

@Component({
  selector: 'app-readnft-admin',
  templateUrl: './readnft-admin.component.html',
  styleUrls: ['./readnft-admin.component.css']
})
export class ReadnftAdminComponent implements OnInit {

  guid:string;
  nftcard:nft = new nft;
  displayedColumns: string[] = ['name', 'values'];
  dataSource = ELEMENT_DATA;
  constructor(private activatedRouter:ActivatedRoute, public http:HttpClient, public url:HttpUrlService, public cookie:CookieService) { 
    
    this.guid = this.activatedRouter.snapshot.paramMap.get('guid') ?? '';
    this.retrieveData();
  }

  ngOnInit(): void {
  }

  retrieveData() {
    this.http.get<any>(this.url.httpUrl() + "/server/api/function/function-api.php?request=readnft&text=" + this.guid).subscribe((res:any) => {
      this.nftcard = res;
      this.dataSource = JSON.parse(res.properties);
    });
  }



}
