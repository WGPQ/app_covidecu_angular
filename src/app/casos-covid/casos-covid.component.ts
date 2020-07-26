import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { DatePipe } from "@angular/common";
import "rxjs/add/operator/map";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { provideRoutes } from '@angular/router';

class Casoscovid {
  constructor(
    public provinciaId: number = 0,
    public fecha: string = "",
    public confirmados: number = 0,
    public fallecidos: number = 0,
    public recuperados: number = 0,
  ) { }
}

@Component({
  selector: 'app-casos-covid',
  templateUrl: './casos-covid.component.html',
  styleUrls: ['./casos-covid.component.sass']
})
export class CasosCovidComponent implements OnInit {
  date_currentli: Date;
  anio: number = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;
  dia: number = new Date().getDate();
  provinciasl: Array<any> = [];
  provinciasv: Array<any> = [];
  caso: Array<any> = [];
  error: any;
  regModel: Casoscovid;
  vista: Boolean = true;

  constructor(private apollo: Apollo, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.displayRegistrations();
  }

  displayRegistrations() {
    this.provinciasl = [];
    this.provinciasv.pop();
    const getAllProvincia = gql`
       query($fecha: Date) {
            provincia{
              id
              nombre
              casos(fecha:$fecha){
                id
                fecha
                confirmados
                fallecidos
                recuperados
              }
            }
          }
    `;

    this.apollo
      .watchQuery({
        variables:{fecha:this.anio + "-" + this.mes + "-" + this.dia},
        query: getAllProvincia,
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((result: any) => result.data.provincia)).subscribe(
          data => {
            
            //this.provinciasl = data;
            this.provinciasl = data.filter(variable=>variable.casos.length !=0); 
            this.provinciasv = data.filter(variable=>variable.casos.length ==0); 
          },
          error => {
            //this.loading = false;
            this.error = error;
          }
        );

  }

  getCasos(casos) {
    const date = new Date();
    let factual = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.caso = casos;
    for (let cas of this.caso) {
      if (cas.fecha.substr(0, 10) == factual) {
        return cas.fallecidos;
      }
    }

  }


  onSave(registro) {
    //this.provinciasv = [];
    const saveProvincia = gql`
       mutation createRegistration(
          $provinciaId: Int!
          $fecha: Date!
          $confirmados: Int!
          $fallecidos: Int!
          $recuperados: Int!
        ) {
          createCaso(caso:{
            provinciaId:$provinciaId
            fecha:$fecha
            confirmados:$confirmados
            fallecidos:$fallecidos
            recuperados:$recuperados
          }
          )
        }
      `;

    this.apollo
      .mutate({
        mutation: saveProvincia,
        variables: {
          provinciaId: registro.id,
          fecha: this.anio + "-" + this.mes + "-" + this.dia,
          confirmados: registro.confirmados,
          fallecidos: registro.fallecidos,
          recuperados: registro.recuperados,
        }
      })
      .subscribe(
        ({ data }) => {
          this.displayRegistrations();
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
      
  }
  onView() {
    this.vista = true;
    this.displayRegistrations();
  }
  oncreate() {
    this.regModel = new Casoscovid();
    this.vista = false;
  }


}
