import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface UsersData {
  name: string;
  id: number;
}

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertiesComponent implements OnInit {

  action:string;
  actionButton:string;
  actionTitle:string;
  selectedItem:string;
  specificQuantity:Boolean;
  local_data:any;
  selectedValue:string;

  constructor(public dialogRef: MatDialogRef<AddPropertiesComponent>,@Optional() @Inject(MAT_DIALOG_DATA) public data: UsersData) {
    this.specificQuantity = true;
    this.local_data = data;
    this.action = this.local_data.action;
    this.actionTitle = 'general_text.' + this.action;
    this.actionButton = this.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  changeTitle() {
    this.actionTitle = 'general_text.' + this.action;
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  ngOnInit(): void {
  }

  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  changeAdd() {
    if(this.selectedItem == 'number') {
      this.actionTitle = 'general_text.' + this.action;
      this.action = 'add';
      this.local_data.values = '';
      this.specificQuantity = false;
    } else {
      this.action = 'addnoml';
      this.local_data.values = this.selectedItem;
      this.actionTitle = 'general_text.' + this.action;
      this.specificQuantity = true;
    }
  }

}
