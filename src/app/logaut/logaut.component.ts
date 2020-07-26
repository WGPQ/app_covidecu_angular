import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logaut',
  templateUrl: './logaut.component.html',
  styleUrls: ['./logaut.component.sass']
})
export class LogautComponent implements OnInit {

  constructor(private route:Router,private appcom:AppComponent) { }

  ngOnInit(): void {
    this.cerrarcession();
     this.appcom.Viewnav(true);
  }
  cerrarcession(){
    localStorage.clear();
    this.route.navigate(['/login']);
  }

}
