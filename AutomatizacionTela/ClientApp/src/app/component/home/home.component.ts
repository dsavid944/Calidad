import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:string="";

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user=localStorage.getItem('Name')!
    if (this.activeRoute.snapshot.paramMap.get('EmailUser') != undefined) {
      this.GetDataUrl();      
    }
    else {
      if (localStorage.getItem('EmailUser') == null) {
        window.location.href = "https://miclocal.com.co:9321/login";
      }
    }
    
  }

  GetDataUrl() {          
  
    let name = this.activeRoute.snapshot.paramMap.get('Name');
    let emailUser = this.activeRoute.snapshot.paramMap.get('EmailUser');    
    
    if (emailUser != '' || emailUser !=null) {      
      localStorage.setItem('EmailUser', emailUser!);
      localStorage.setItem('Name', name!);        
      window.location.href = "/home"
    } else {
      window.location.href = "https://miclocal.com.co:9321/login"
    }   

  } 

}
