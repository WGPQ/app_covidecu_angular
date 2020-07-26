import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import "rxjs/add/operator/map";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { provideRoutes } from '@angular/router';

class Usuario{
  constructor(
    public nombre: string="",
    public usuario: string="",
    public contrasenia: string="",
  ){}
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})

export class UsersComponent implements OnInit {
  usuarios: Array<any> = [];
  regModel: Usuario;
  showNew: Boolean = false;
  error: any;

  constructor(private apollo:Apollo) { }

  ngOnInit(): void {
this.displayRegistrations();
  }
  onNew(){
    this.regModel= new Usuario();
    this.showNew=true;
  }
  displayRegistrations() {
    const getAllProvincia = gql`
      query {
            usuario{
              id
              nombre
              usuario
              contrasenia
            }
          }
    `;

    this.apollo
      .watchQuery({
        query: getAllProvincia,
        fetchPolicy: "network-only"
      })
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((result: any) => result.data.usuario)).subscribe(
          data => {
            this.usuarios = data;
            //this.loading = loading
          },
          error => {
            //this.loading = false;
            this.error = error;
          }
        );

  }
  onCreate(){
    console.log(this.regModel)
    const saveProvincia = gql`
    mutation createRegistration(
       $nombre: String!
       $usuario: String!
       $contrasenia: String!
     ) {
      createUser(user:{
         nombre:$nombre
         usuario:$usuario
         contrasenia:$contrasenia
       }
       )
     }
   `;

   this.apollo
     .mutate({
       mutation: saveProvincia,
       variables: {
       nombre:this.regModel.nombre,
       usuario: this.regModel.usuario,
       contrasenia: this.regModel.contrasenia,
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
  

}
