import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Wallet } from 'ethers';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs'
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';
import { SentimentService } from 'src/app/service/sentiment/sentiment.service';

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
  chkUsr:boolean = false;
  chkEmail:boolean = false;
  Wall:Wall = new Wall();
  public wallet: Wallet;
  public mnemonic: string[];
  public keystore:string;
  messageError:string[];
  loading:boolean;

  checkTerms:boolean = false;
  checkPrivacy:boolean = false;
  
  constructor(public http:HttpClient, public fb:FormBuilder, public cookie:CookieService, public dialog: MatDialog, public url: HttpUrlService, public _auth:AuthService,
    public _snackBar:MatSnackBar, public sentiment:SentimentService,public translate: TranslateService) {
    
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
    try {
      if(this.checkTerms == true && this.checkPrivacy == true) {
        this.loading = true;
      this.showProgressSpinner();
      let i = '';
      let u = '';
      let us = '';
      let em = '';
        if(this.chkUsr == true && this.chkEmail == true) {
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
          if (this.chkEmail == false) {i = 'notify_text.error.form.signup_login.error-email-alredy-exist';} else { i = ''}
          if (this.chkUsr == false) {u = 'notify_text.error.form.signup_login.error-username-alredy-exist'} else { u = ''}
  
          this.messageError = [i,u];
          this.loading = false;
        }
      } else {
        this.loading = false;
        this.messageError = ['notify_text.error.form.signup_login.accept-terms-and-privacy',''];
      }
    }
    catch {
    }
    finally {
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

  async checkUsername():Promise<boolean> {
    this.messageError = [] ;
    let res = await this.sentiment.checkPass(this.formRegister.value.username);
    if(res >= 0) {
      this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=username&data=" + this.formRegister.value.username, {responseType: 'text'})
        .subscribe(res => {
          if(res == 'OK') {
            return this.chkUsr = true;
          } else {
            return this.chkUsr = false;
          }
      });
      return this.chkUsr;
    } else {
      this.messageError = ['notify_text.error.error_text.message-abuse-text',''];
      return this.chkUsr = true;
    }
  }

  async checkEmail():Promise<boolean> {
    this.http.get(this.url.httpUrl() + "/server/api/user/user-api.php?request=checkUserKey&key=email&data=" + this.formRegister.value.email.trim().toLowerCase(), {responseType: 'text'})
    .subscribe(res => {
      if(res != 'OK') {
        return this.chkEmail = false;
      }
      return this.chkEmail = true;
    });
    return this.chkEmail;
  }

}
