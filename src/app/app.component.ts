import { Component } from '@angular/core';
import { visit } from 'graphql';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  {
  title = 'appcovid';
  shownav: Boolean=true;
  
  Viewnav(vista:Boolean) {
     this.shownav=vista;
   }
}


