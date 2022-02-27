import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
  showFiller = false;
  loading:boolean;
  @Input() login:boolean;
  @Input() offlineSite:boolean;
  @Input() displayprogressspinner:boolean;
  obj:string = '620e843b00b8e';
  cookieVal:string;

  constructor(public router:Router,private translateService: TranslateService, private _auth:AuthService, private cookie:CookieService) {
    this.onActivate();
    this.cookieVal = this.cookie.get('blktl_id');
  }

  onActivate() {
    window.scroll(0,0);
  }

  ngOnInit(): void {
    this.loading = false;
  }

  public selectLanguage(event:string) {
    this.translateService.use(event);
    localStorage.setItem('i18', event);
  }
}
