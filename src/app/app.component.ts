import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateCompiler } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { ConnectionFailed } from './app.module';
import { SplashService } from './service/splash/splash.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blocktailchain';
  language:any;
  login:boolean;
  OfflineSite:boolean;
  loading:boolean = false;

  constructor(private cookie:CookieService, private _snackBar: MatSnackBar, private splashScreenStateService: SplashService) {
    this.OfflineSite = ConnectionFailed(navigator.onLine);
    if(this.OfflineSite != true) { this.openSnackBar('', 'ciao')}
    let cook = cookie.get('blktl_id');
    if(cook == null || cook == '') {
      this.login = false;
      this.cookie.deleteAll();
    } else {
      this.login = true;
    }
    this.onActivate();
  }

  ngOnInit():void {
    setTimeout(() => {
      this.splashScreenStateService.stop();
   }, 1000);
   
  }

  onActivate() {
    window.scroll(0,0)
  }

  public changeLanguage(event:any) {
    this.language = event;
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
