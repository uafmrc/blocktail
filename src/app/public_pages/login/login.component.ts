import { HttpClient } from '@angular/common/http';
import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() login:boolean;
  formLogin:FormGroup;
  loadingForm:boolean;
  messageError:string;
  chkEmail:boolean = false;
  ipadd:string;
  
  constructor(public http:HttpClient, public fb:FormBuilder, public cookie:CookieService, public url: HttpUrlService, public _auth:AuthService) { 
    
    this.formLogin = fb.group({
      'email':['',[Validators.email,Validators.required]],
      'password':['',[Validators.required]]
    });
    this.loadingForm = false;
    
    
  }

  ngOnInit(): void {
    
  }


  clickLogin() {
    if(this.chkEmail == false) {
      this.loadingForm = false;
      this.messageError = 'notify_text.error.form.signup_login.error-email-not-exist';
    } else {
      this.loadingForm = true;
      this.http.post<any>(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
        "request": "login",
        "email": this.formLogin.value.email.toLowerCase().trim(),
        "address": localStorage.getItem('address'),
        "password": this.formLogin.value.password.trim()
      })).subscribe(res => {
        if(res.activated != '1') {
          localStorage.removeItem('address');
          this.loadingForm = false;
          this.messageError = 'notify_text.error.form.signup_login.error-account-not-activated';
        } else {
          this.formLogin.reset();
          this.cookie.deleteAll();
          this.cookie.set("blktl_id",res.guid,100);
          this.cookie.set("blktl_chk",res.data,100);
          this.cookie.set("blktl_usr",res.username,100);
          window.location.href = "/";
        }
    });
    }
    
  }

  async getErrorEmail() { 
    if(this.formLogin.controls['email'].hasError('require')) { 
      return this.formLogin.controls['email'].hasError('email') ? '' : 'La mail inserita non è una mail';
    } else {
      return 'Inserisci un\'email valida'
    }
  }

  checkEmail() {
    this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=email&data=" + this.formLogin.value.email.trim().toLowerCase(), {responseType: 'text'})
    .subscribe(res => {
      if(res != 'OK') {
        this.chkEmail = false;
      }
      this.chkEmail = true;
    });
  }

  async getErrorPassword() { 
    return this.formLogin.controls['password'].hasError('require') ? '' : 'Inserisci una password valida'
  }

}
