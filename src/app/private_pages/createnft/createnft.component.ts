import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';
import { AddPropertiesComponent } from './component/add-properties/add-properties.component';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/auth.service';


export interface UsersData {
  values:string;
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
];

@Component({
  selector: 'app-createnft',
  templateUrl: './createnft.component.html',
  styleUrls: ['./createnft.component.css']
})
export class CreatenftComponent implements OnInit {

  files: File[] = [];
  disabledClick:boolean = false;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  count:number = 1;
  formNft:FormGroup;
  loading:boolean = false;
  res:string;
  guidNft:string;
  elementTranslate:Boolean = false;
  displayedColumns: string[] = ['name', 'values', 'action'];
  dataSource = ELEMENT_DATA;

  class1:boolean = false;
  class2:boolean = false;
  class3:boolean = false;
  class4:boolean = false;
  class5:boolean = false;

  

  constructor(private http:HttpClient, public dialog:MatDialog, public cookie:CookieService, public fb:FormBuilder, public url:HttpUrlService, public _auth:AuthService) {
    this._auth.checkLogin();
    this.formNft = fb.group({
      'name':['',[Validators.required]],
      'description':['',[Validators.required]],
      'content_explicit':['',[Validators.required]],
      'max_piece':['',[Validators.required]]
    });
    
  }

  onclickTmp(event:any) {
    this.class1 = false;this.class2 = false;this.class3 = false;
    this.class4 = false;this.class5 = false;
    if(event == '1') {
      this.class1 = true;
      this.formNft.controls['max_piece'].setValue('1');
      this.class2 = false;this.class3 = false;
      this.class4 = false;this.class5 = false;
    } else if(event == '2') {
      this.class2 = true;
      this.formNft.controls['max_piece'].setValue('2');
      this.class1 = false;this.class3 = false;
      this.class4 = false;this.class5 = false;
    } else if (event == '3') {
      this.class3 = true;
      this.formNft.controls['max_piece'].setValue('3');
      this.class1 = false;this.class2 = false;
      this.class4 = false;this.class5 = false;
    } else if(event == '4') {
      this.class4 = true;
      this.formNft.controls['max_piece'].setValue('4');
      this.class1 = false;this.class2 = false;
      this.class3 = false;this.class5 = false;
    } else if (event == '5') {
      this.class5 = true;
      this.formNft.controls['max_piece'].setValue('5');
      this.class1 = false;this.class2 = false;
      this.class3 = false;this.class4 = false;
    } else {
      this.class1 = false;this.class2 = false;this.class3 = false;
      this.class4 = false;this.class5 = false;
    }
  }

  checkNameSentiment() {
    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var result = sentiment.analyze(this.formNft.controls['name'].value, {language: 'en'});
    console.log(result); 
  }

  checkDescriptionSentiment() {
    var Sentiment = require('sentiment');
    var sentiment = new Sentiment();
    var result = sentiment.analyze(this.formNft.controls['description'].value);
    console.log(result); 
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
      }).then(result => location.replace('../collect'))
    } else if(event == 'error') {
      this.loading = false;
      Swal.fire({
        icon: 'error',
        title: 'Qualcosa è andato storto',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };

  ngOnInit(): void {
  }

  async onSelect(event:any) {
    if (this.files.length === 1) {
      this.files.length = 0;
    }
    this.files.push(...event.addedFiles);
  }
  
  async onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  


  async openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AddPropertiesComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'add'){
        this.addRowData(result.data);
      }else if(result.event == 'addnoml') {
        this.addRowDataWithoutML(result.data);
      }else if(result.event == 'update'){
        this.updateRowData(result.data);
      }else if(result.event == 'delete'){
        this.deleteRowData(result.data);
      }
      this.table.renderRows();
    });
  }

  async DeleteNftProject() {
    this.http.post<any>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
            "request": "removeProofCreate",
            "client": this.cookie.get('blktl_id')
          })).subscribe(res => {
            if(res.result != 'KO') {
              localStorage.removeItem('tmp');
            }
          });
  }

  async addRowData(row_obj:any){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      values:row_obj.values + ' ml'
    });
    this.table.renderRows();
    
  }

  async addRowDataWithoutML(row_obj:any){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name,
      values:row_obj.values
    });
    this.table.renderRows();
  }

  async updateRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }

  async deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  createNft() {
    if(this.formNft.valid) {
      this.showProgressSpinner();
      this.createBasicNft();
    } else {
      this.hideProgressSpinner('error');
    }
    
  }

  async createBasicNft():Promise<any> {
    let result;
    this.http.post<any>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
            "request": "create",
            "name": this.formNft.controls['name'].value,
            "description": this.formNft.controls['description'].value,
            "properties": JSON.stringify(ELEMENT_DATA),
            "content_explicit": this.formNft.controls['content_explicit'].value,
            "max_piece": this.formNft.controls['max_piece'].value,
            "client": this.cookie.get('blktl_id')
          })).subscribe(res => {
            if(res.result != null) {
              result = res.result;
              this.formNft.reset;
            } else {result = null;}
    });
    this.hideProgressSpinner('success');
    return result;
  }

  /*uploadFile(guid_user:string,guid_nft:string) {
    const formFile = new FormData();
    formFile.append('file[]', this.files[0]);
    formFile.append('guid_user', guid_user);
    formFile.append('guid_nft', guid_nft);
    this.http.post(this.url.httpUrl() + "/server/api/upload/upload-api.php", formFile
      ).subscribe(res => {
        console.log(res);
        this.loading = false;
    });
  }*/
}
