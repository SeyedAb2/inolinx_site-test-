import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { GeneralService } from 'src/app/services/general.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  stickyController?:boolean;
  contactForm!:FormGroup;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.innerWidth >768){
      if(window.scrollY > 0){
        this.stickyController = true;
      }
      else{
        this.stickyController = false;
      }
    }
  }
  constructor(private Title:Title,
    private Meta:Meta,
    private General:GeneralService) { }
  opensweetalert()
  {
    Swal.fire({
        title: 'پیام شما ارسال شد',
        text: 'پس از بررسی پیام حتما باشما تماس گرفته خواهد شد',
        confirmButtonText:'تایید',
        icon: 'success'
      });
  }
  submit(){
    this.General.ContactUs(this.contactForm?.value);
    this.contactForm.reset();
    this.opensweetalert();
  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      fullName:new FormControl('',Validators.required),
      phone:new FormControl(NaN,[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email:new FormControl('',[Validators.required,Validators.email]),
      text:new FormControl('',Validators.required),
      subject:new FormControl('',Validators.required),
    })
    this.Title.setTitle('اینولینکس | ارتباط باما');
    this.Meta.updateTag({property: 'اینولینکس | ارتباط باما'});
    this.Meta.updateTag({name: 'keywords',content: 'ارتباط,تماس باما,درباره ما,درباره اینولینکس,آدرس اینویلنکس'})
    this.Meta.updateTag({name: 'description',content: 'برای تماس و ارتباط گیری و همچنین دریافت اطلاعات درمورد اینولینکس وارد این صفحه شوید'})
    this.Meta.updateTag({property: 'og:description',content: 'برای تماس و ارتباط گیری و همچنین دریافت اطلاعات درمورد اینولینکس وارد این صفحه شوید'})
  }

}
