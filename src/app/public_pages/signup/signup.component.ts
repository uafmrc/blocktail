import { HttpClient } from '@angular/common/http';
import { ThisReceiver, TransitiveCompileNgModuleMetadata } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Wallet } from 'ethers';
import { CookieService } from 'ngx-cookie-service';
import { findIndex } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';

class Wall {
  wallet:string;
  seed:string;
  privateKey:string;
  keystore:string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Input() login:boolean;
  formRegister:FormGroup;
  chkUsr:string;
  chkEmail:string;
  Wall:Wall = new Wall();
  public wallet: Wallet;
  public mnemonic: string[];
  public keystore:string;
  messageError:string[];
  loading:boolean;
  
  constructor(public http:HttpClient, public fb:FormBuilder, public cookie:CookieService, public dialog: MatDialog, public url: HttpUrlService, public _auth:AuthService) {
    
    this.formRegister = fb.group({
      'username':['',[Validators.required]],
      'email':['',[Validators.email,Validators.required]],
      'password':['',[Validators.required, ]],
      'passwordtwo':['',[Validators.required]]
    });
    this.loading = false;
    
   }

  ngOnInit(): void {
  }

  showProgressSpinner = () => {
    this.loading = true;
  };

  async clickRegister() {
    this.loading = true;
    this.showProgressSpinner();
    let i = '';
    let u = '';
    let us = '';
    let em = '';
      if(this.chkUsr == 'true' && this.chkEmail == 'true') {
        if(this.formRegister.value.password.trim() == this.formRegister.value.passwordtwo.trim()) {
          let private_key = await this.CreateWallet(this.formRegister.value.password.trim());
          this.http.post(this.url.httpUrl() + "/server/api/user/user-api.php", JSON.stringify({
            "request": "create",
            "username": this.formRegister.value.username.toLowerCase().trim(),
            "email": this.formRegister.value.email.toLowerCase().trim(),
            "password": this.formRegister.value.password.trim(),
            "wallet": this.wallet.address,
            "seed": this.mnemonic.toString(),
            "keystore": '',
            "privatekey": private_key
          })).subscribe(res => {
            if(res != null) {
              this.formRegister.reset();
              this.cookie.deleteAll();
              localStorage.removeItem('keystore');
              window.location.replace('');
            } else { this.loading = false; }
          });
        } else {
          this.loading = false;
        }
      } else {
        if (this.chkEmail == 'false') {i = 'notify_text.error.form.signup_login.error-email-alredy-exist';} else { i = ''}
        if (this.chkUsr == 'false') {u = 'notify_text.error.form.signup_login.error-username-alredy-exist'} else { u = ''}

        this.messageError = [i,u];
        this.loading = false;
      }
    
  }

  async CreateWallet(password:string) {
    this.wallet = Wallet.createRandom();
    this.mnemonic = this.wallet.mnemonic.phrase.split(' ');
    this.Wall.wallet = this.wallet.publicKey;
    const key_store = await this.wallet.encrypt(password);
    localStorage.setItem('keystore', key_store);
    return this.wallet.privateKey.toString().toLowerCase();
  }

  getErrorUsername() {
    if(this.formRegister.controls['username'].hasError('require')) {
      return '';
    } else {
      return "notify_text.error.form.signup_login.error-username-not-valid";
    } 
  }

  async checkUsername():Promise<any> {
    this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=username&data=" + this.formRegister.value.username, {responseType: 'text'})
    .subscribe(res => {
      if(res == 'OK') {
        this.chkUsr = 'true';
      } else {
        this.chkUsr = 'false';
      }
    });
  }

  async checkEmail():Promise<any> {
    this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=email&data=" + this.formRegister.value.email.trim().toLowerCase(), {responseType: 'text'})
    .subscribe(res => {
      if(res != 'OK') {
        this.chkEmail = 'false';
      }
      this.chkEmail = 'true';
    });
  }

}
