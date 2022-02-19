import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

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
  }

  ngOnInit(): void {
  }

  clickLogin() {
    console.log(this.formLogin.value.email.toLowerCase().trim());
    console.log(localStorage.getItem('address'));
    console.log(this.formLogin.value.password.trim());
      this.http.post<any>(this.url.httpUrl() + "/server/api/function/function-api.php", JSON.stringify({
        "request": "login",
        "email": this.formLogin.value.email.toLowerCase().trim(),
        "address": localStorage.getItem('address'),
        "password": this.formLogin.value.password.trim()
      })).subscribe(res => {
        if(res.activated != '1') {
          localStorage.removeItem('address');
          this.loadingForm = false;
          this.messageError = 'login.form.error-account-not-activated';
        } else {
          this.formLogin.reset();
          this.cookie.deleteAll();
          localStorage.clear();
          this.cookie.set("blktl_id",res.guid,100);
          this.cookie.set("blktl_chk",res.data,100);
          window.location.replace('../../../../function/core/admin/dashboard');
        }
    });
  }

}
