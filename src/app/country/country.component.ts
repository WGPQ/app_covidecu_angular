import { Component, OnInit, Injectable} from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import "rxjs/add/operator/map";
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { provideRoutes } from '@angular/router';
class Provincia {
  constructor(
    public id:number=0,
    public nombre: string = "",
    public imageurl: string = ""
  ) { }
}
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})


export class CountryComponent implements OnInit {

  provincias: Array<any> = [];
  regModel: Provincia;
  submitType: string = "Save";
  selectedRow: number;
  error: any;
  showNew: Boolean = false;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.displayRegistrations();
  }
  displayRegistrations() {
    const getAllProvincia = gql`
      query {
            provincia{
              id
              nombre
              imageurl
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
        map((result: any) => result.data.provincia)).subscribe(
          data => {
            this.provincias = data;
            //this.loading = loading
          },
          error => {
            //this.loading = false;
            this.error = error;
          }
        );

  }
  onNew() {
    this.regModel = new Provincia();
    this.submitType = "Save";
    this.showNew=true;
    
  };
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.regModel = new Provincia();
    // Retrieve selected registration from list and assign to model.
    //this.regModel = Object.assign({}, this.provincias[this.selectedRow]);
    this.regModel= Object.assign({},this.provincias.find(function(provincia){
      return provincia.id === index ? provincia : null;
    }));
    // Change submitType to Update.
    this.submitType = "Update";
    // Display registration entry section.
    this.showNew=true;
  };

  onDelete(index: number) {
    const deleteProv = gql`
    mutation deleteProv($id: ID!) {
      deleteProv(id: $id) {
        id
      }
    }
  `;
  this.apollo
    .mutate({
      mutation: deleteProv,
      variables: {
        id: index
      }
    })
    .subscribe(
      ({ data }) => {
        console.log("got editdata", data);
        this.displayRegistrations();
      },
      error => {
        console.log("there was an error sending the query", error);
      }
    );
  };


  onSave() {
    console.log(this.regModel);
    if (this.submitType === "Save") {
      const saveProvincia = gql`
        mutation createRegistration(
          $nombre: String!
          $imageurl: String!
        ) {
          createProv(provincia:{
            nombre: $nombre
            imageurl: $imageurl
          }
          )
        }
      `;
      this.apollo
        .mutate({
          mutation: saveProvincia,
          variables: {
            nombre: this.regModel.nombre,
            imageurl: this.regModel.imageurl,
          }
        })
        .subscribe(
          ({ data }) => {
            this.displayRegistrations();
            console.log(data);
          },
          error => {
            console.log("there was an error sending the query", error);
          }
        );

      // Push registration model object into registration list.
      // this.registrations.push(this.regModel);
    } else {
      const updateProvInfo = gql`
        mutation updateProvInfo(
          $id: ID!
          $nombre: String!
          $imageurl: String!
        )
         {
          updateProvInfo(
            id: $id
            nombre: $nombre
            imageurl: $imageurl
          )
          {
            id
            nombre
          }
        }
          
      `;
      this.apollo
        .mutate({
          mutation: updateProvInfo,
          variables: {
            id: this.selectedRow,
            nombre: this.regModel.nombre,
            imageurl: this.regModel.imageurl
          }
        })
        .subscribe(
          ({ data }) => {
            console.log("got editdata", data);
            this.displayRegistrations();
          },
          error => {
            console.log("there was an error sending the query", error);
          }
        );
    }
    this.showNew=false;
    // Hide registration entry section.
  };
}
