import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddPropertiesComponent } from '../add-properties/add-properties.component';

export interface Data {
  result: string;
}

@Component({
  selector: 'app-destroy-save',
  templateUrl: './destroy-save.component.html',
  styleUrls: ['./destroy-save.component.css']
})
export class DestroySaveComponent implements OnInit {

  action:string;
  local_data:any;

  constructor(public dialogRef: MatDialogRef<AddPropertiesComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: Data) { 
    
  }

  ngOnInit(): void {
  }

  doAction():void {
    this.dialogRef.close({event:'Save',data:this.local_data});
  }

  closeDialog():void {
    this.dialogRef.close({event:'Cancel'});
  }

}
