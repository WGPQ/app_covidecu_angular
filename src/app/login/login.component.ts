import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import "rxjs/add/operator/map";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { provideRoutes, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

class Usuario {
  constructor(
    public id: number = 0,
    public nombre: string = "",
    public usuario: string = "",
    public contrasenia: string = ""
  ) { }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  usuarios: Array<any> = [];
  usuario: any = [];
  regModel: Usuario;
  login: Boolean = false;
  submitType: string = "Ingresar";
  selectedRow: number;
  registrationList: Array<any> = [];
  erroshow: Boolean = false;
  error: String="";
  loading = true;

  constructor(private apollo: Apollo, private router: Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.regModel = new Usuario();
  }
  showTosat(){
    this.toastr.success("asasas", "title",{positionClass:'toast-bottom-full-width'});
  }
  Inicio() {
    const userQuery = gql`
    mutation login ($usuario: String!,$contrasenia:String!) {  
      login(user:{usuario:$usuario,contrasenia:$contrasenia}){
        user{
          id
          nombre
          usuario
          contrasenia
        }
            success
            token
            errors{
              path
              message
            }
          }
    }
  `;
    this.apollo
      .mutate({
        mutation: userQuery,
        variables: {
          usuario: this.regModel.usuario,
          contrasenia: this.regModel.contrasenia,
        }
      })
      .subscribe(
        ({ data }) => {
          this.usuario = data;
          if (this.usuario.login.success == true) {
            localStorage.setItem('userToken', this.usuario.login.token);
            this.router.navigate(['dash/home']);
          } else {
             for(let msg of this.usuario.login.errors){
              this.error=msg.message;
             }
             this.erroshow=true;
          }
        },
        error => {
          console.log("there was an error sending the query", error);
        }
      );
  }


}
