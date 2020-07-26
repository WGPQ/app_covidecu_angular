import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
@Injectable()
export class CalendarComponent implements OnInit {
  miarray: any[];
  vista:Boolean=true;

  constructor() { }
 


  ngOnInit(): void {
  console.log(this.getall());
  }
  getall(){
       return this.miarray=[1,2,2,3,4];
  }
 
  onView(){
    return this.vista=false;
  }
  oncreate(){
    return this.vista=true;
  }

}
