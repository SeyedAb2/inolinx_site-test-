import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { ReportInterface } from '../../interfaces/index.interface';
import { AfterSendMassageComponent } from './afterSendMassage/afterSendMassage.component';

@Component({
  selector: 'app-reportDialog',
  templateUrl: './reportDialog.component.html',
  styleUrls: ['./reportDialog.component.scss']
})
export class ReportDialogComponent implements OnInit {
  @ViewChild('select') select:any;
  reportStatus?:any;
  subscription?:Subscription;
  postID?:string;
  reportGroup!:FormGroup;
  constructor(public General:GeneralService,public Dialog: MatDialog) { }
  onSubmit(){
    // console.log(this.reportGroup.value)
    let valueParam = this.reportGroup.value.select;
    if(valueParam =='1'){valueParam = valueParam = 'محتوای تقلبی یا کپی'}
    else if(valueParam == '2'){valueParam = valueParam = 'استفاده از کلمات منشوری'}
    else if(valueParam == '3'){valueParam = valueParam = 'توهین به اشخاص،ادیان،مذاهب،جریان و...'}
    else if(valueParam == '4'){valueParam = valueParam = 'هیچکدام'}
    this.reportGroup.value.select = valueParam;
    this.General.SendReportPostMassage(this.reportGroup.value);
    this.Dialog.open(AfterSendMassageComponent);
  }
  ngOnInit() {
    this.subscription = this.General.postID.subscribe( id => this.postID = id )
    this.reportGroup = new FormGroup({
      email:new FormControl(null,[Validators.required,Validators.email]),
      select:new FormControl('1',Validators.required),
      //text:new FormControl(null,this.reportStatus),
      id:new FormControl(this.postID),
    })
    this.selectValue.valueChanges.subscribe((checked:any) =>{
      if (checked == '4') {
        const validators = [Validators.required];
        this.reportGroup.addControl('selectExtra', new FormControl('', validators));
      } else {
        this.reportGroup.removeControl('selectExtra');
      }
      this.reportGroup.updateValueAndValidity();
    })
    
  }
  get selectValue() {
    return this.reportGroup.get('select') as FormControl;
  }

  get selectExtra() {
    return this.reportGroup.get('selectExtra') as FormControl;
  }
}
