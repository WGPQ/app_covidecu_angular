import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private appcom:AppComponent) { }

  ngOnInit(): void {
    if(localStorage.getItem('userToken')==null){
      this.appcom.Viewnav(true);
    }
    if(localStorage.getItem('userToken')!=null){
      this.appcom.Viewnav(false);
    }
  }
 
}
