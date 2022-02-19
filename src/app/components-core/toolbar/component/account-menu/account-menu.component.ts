import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {

  @Input() login:boolean;
  obj:string = '620e843b00b8e';
  cookieVal:string;
  constructor(public cookie:CookieService, public route:Router) {
    this.cookieVal = this.cookie.get('blktl_id');
   }

  ngOnInit(): void {
  }

  clickLogout() {
    this.cookie.deleteAll();
    this.login == false;
    window.location.replace('');
  }

}
