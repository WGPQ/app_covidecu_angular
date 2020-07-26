import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { GraphQLModule } from './graphql.module';
import { FormsModule } from "@angular/forms";
import { CountryComponent } from './country/country.component';
import { HomeComponent } from './home/home.component';
import { Page400Component } from './page400/page400.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainSedebarComponent } from './main-sedebar/main-sedebar.component';
import { ControllerSedebarComponent } from './controller-sedebar/controller-sedebar.component';
import { ContactComponent } from './contact/contact.component';
import { CasosCovidComponent } from './casos-covid/casos-covid.component';
import { CalendarComponent } from './calendar/calendar.component';
import { UsersComponent } from './users/users.component';
import { ServicesComponent } from './services/services.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogautComponent } from './logaut/logaut.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CountryComponent,
    HomeComponent,
    Page400Component,
    HeaderComponent,
    FooterComponent,
    MainSedebarComponent,
    ControllerSedebarComponent,
    ContactComponent,
    CasosCovidComponent,
    CalendarComponent,
    UsersComponent,
    ServicesComponent,
    HomepageComponent,
    LogautComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    GraphQLModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports:[],
  providers: [CountryComponent,CalendarComponent,UsersComponent,DatePipe,AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
