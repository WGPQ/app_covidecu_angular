import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { Page400Component } from './page400/page400.component';
import { AuthGuard } from './ards/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { CountryComponent } from './country/country.component';
import { CasosCovidComponent } from './casos-covid/casos-covid.component';
import { UsersComponent } from './users/users.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogautComponent } from './logaut/logaut.component';


const routes: Routes = [
  { path: '', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dash', component: DashboardComponent,
children:[
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard]}, 
  { path: 'contact', component: ContactComponent,canActivate:[AuthGuard]},
  { path: 'country', component: CountryComponent,canActivate:[AuthGuard]},
  { path: 'casesc', component: CasosCovidComponent,canActivate:[AuthGuard]},
  { path: 'calendar', component: CalendarComponent,canActivate:[AuthGuard]},
  { path: 'users', component: UsersComponent,canActivate:[AuthGuard]},
  { path: 'logaut', component: LogautComponent},
  { path: '**', component: Page400Component},
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
