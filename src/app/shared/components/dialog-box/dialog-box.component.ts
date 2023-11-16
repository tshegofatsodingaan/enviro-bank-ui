import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit{

  public dialogDetails: { title?: string, content?: string } = {};
  hideContinueButton = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private toast: NgToastService) {

    this.dialogDetails = data;
  }

  ngOnInit(): void {

    if(this.dialogDetails.title == 'Warning'){
      this.hideContinueButton = true;
    }
  }

  onClickCancel() {
    this.toast.info({detail:'Note', summary: 'Operation Canceled', duration: 5000});
  }

  onClickContinue() {
  }



}
