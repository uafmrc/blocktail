import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpUrlService } from 'src/app/service/http/http-url.service';
import Swal from 'sweetalert2';
import { AddPropertiesComponent } from '../createnft/component/add-properties/add-properties.component';

export interface UsersData {
  values:string;
  name: string;
  id: number;
}let ELEMENT_DATA: UsersData[] = [
];

@Component({
  selector: 'app-readnft',
  templateUrl: './readnft.component.html',
  styleUrls: ['./readnft.component.css']
})
export class ReadnftComponent implements OnInit, OnDestroy {

  guid:string;
  loading:boolean = false;
  formNft:FormGroup;
  count:number = 1;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  displayedColumns: string[] = ['name', 'values', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(private activatedRouter:ActivatedRoute, private http:HttpClient, public dialog:MatDialog, public cookie:CookieService, public fb:FormBuilder, public url:HttpUrlService, private _auth:AuthService) {
    this._auth.checkLogin();
    this.guid = this.activatedRouter.snapshot.paramMap.get('modify') ?? '';
    this.formNft = fb.group({
      'name':['',[Validators.required]],
      'description':['',[Validators.required]],
      'content_explicit':['',[Validators.required]],
      'max_piece':['',[Validators.required]]
    });
    this.retrieveData(this.guid);
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void {
    this.dataSource = [];
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

  async openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(AddPropertiesComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  async addRowData(row_obj:any){
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
        value.values = row_obj.values;
      }
      return true;
    });
  }

  async deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }

  retrieveData(guid:string) {
    this.http.post<any>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
      "request": "readsinglenft",
      "guid": guid
    })).subscribe(res => {
      if(res != null) {
        this.formNft.controls['name'].setValue(res.name);
        this.formNft.controls['description'].setValue(res.description);
        ELEMENT_DATA = JSON.parse(res.properties);
        this.dataSource = ELEMENT_DATA;
      } else { window.location.replace(''); }
    });
  }

  async updateNft() {
    if(this.formNft.valid) {
      this.showProgressSpinner();
      let result;
      this.http.post<any>(this.url.httpUrl() + "/server/api/nft/nft-api.php", JSON.stringify({
        "request": "update",
        "name": this.formNft.controls['name'].value,
        "description": this.formNft.controls['description'].value,
        "properties": JSON.stringify(ELEMENT_DATA),
        "content_explicit": this.formNft.controls['content_explicit'].value,
        "max_piece": this.formNft.controls['max_piece'].value,
        "guid": this.guid
      })).subscribe(res => {
        if(res.result != null) {
          result = res.result;
          this.hideProgressSpinner('success');
        } else {this.hideProgressSpinner('error'); result = null;}
        window.location.replace('../buildnft/' + res.result);
      });
    } else {this.hideProgressSpinner('error')}
    
  }

}
