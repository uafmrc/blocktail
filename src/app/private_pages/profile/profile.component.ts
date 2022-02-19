import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';
import Swal from 'sweetalert2';
import { resourceLimits } from 'worker_threads';

class User {
  id:string;
  username:string;
  email:string;
  password:string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  panelOpenState:boolean;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  chkEmail:string;
  user:User;
  loading:boolean;
  formUser:FormGroup;
  
  constructor(public http:HttpClient, public cookie:CookieService, public url:HttpUrlService, private _auth:AuthService, public fb:FormBuilder) {
    this._auth.checkLogin();
    this.user = new User;
    this.panelOpenState = false;
    this.readUser(this.cookie.get('blktl_id'));
    this.formUser = fb.group({
      'email':['',[Validators.required, Validators.email]],
      'username':['',[Validators.required]]
    });
      
  }

  ngOnInit(): void {
  }

  showProgressSpinner = () => {
    this.loading = true;
  };

  hideProgressSpinner = (event:string) => {
    if(event == 'success') {
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      }).then(result => location.reload())
    } else if(event == 'error') {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Qualcosa è andato storto',
        showConfirmButton: false,
        timer: 1500
      }).then(res => location.reload())
    }
  };

  async checkEmail():Promise<any> {
    this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=email&data=" + '', {responseType: 'text'})
    .subscribe(res => {
      if(res != 'OK') {
        this.chkEmail = 'false';
      }
      this.chkEmail = 'true';
    });
  }

  async readUser(id:string) {
    this.loading = true;
    this.http.post<any>(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
            "request": "readUser",
            "id": id
          })).subscribe(res => {
            if(res != null) {
              this.formUser.controls['email'].setValue(res.email);
              this.formUser.controls['username'].setValue(res.username);
              this.user.email = res.email;
              this.user.username = res.username;
              this.user.password = res.password;
              this.loading = false;
            } else { window.location.replace(''); }
          });
  }

  checkChange():boolean {
    let res = false;
    if(this.user.email != this.formUser.controls['email'].value) {
      res = true;
    } else if(this.user.username != this.formUser.controls['username'].value) {
      res = true;
    } else { res = false; }
    return res;
  }

  async clickChangeEmailUsername() {
    let email = this.formUser.value.email.toLowerCase().trim();
    let username = this.formUser.value.username.trim();
    if(this.user.email == this.formUser.controls['email'].value) {
      email = null;
    } else if(this.user.username == this.formUser.controls['username'].value) {
      username = null;
    }
    let cook = this.cookie.get('blktl_id');
    this.showProgressSpinner();
    if(this.formUser.valid) {
      this.http.post<any>(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
        "request": "updateEmailUsername",
        "email": email,
        "username": username,
        "guid": cook
      })).subscribe(res => {
        if(res.result != '201') {
          this.hideProgressSpinner('error');
        } else {
          this.hideProgressSpinner('success');
        }
      });
    } else {
      this.hideProgressSpinner('error');
    }
  }

  



}
