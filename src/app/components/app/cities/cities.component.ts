import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { City } from '../../models/city.model';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  cities: City[] = [];

  constructor(
    private cityServices: CityService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities() {
    this.cityServices.getCities().subscribe(
      data => {
        this.cities = data;
      });
  }

  deleteCity(id: City["code"]) {
    this.cityServices.deleteCity(id).subscribe(
      data => {
        alert(data.nota);
        this.getCities();
      });
  }

  openDialog(city: City) {
    const dialogRef = this.dialog.open(CitiesDialog, {
      width: '250px',
      data: {city},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      this.getCities();
    });
  }

}

@Component({
  selector: 'app-cities-dialog',
  templateUrl: 'cities.dialog.html',
  styleUrls: ['./cities.component.scss', '../../../app.component.scss']
})
export class CitiesDialog {

  error: boolean = false;
  msjError: string = "";

  city: City = {
    code: null,
    description: ""
  };

  titleModal: String = '';

  constructor(
    private cityServices: CityService,
    public dialogRef: MatDialogRef<CitiesDialog>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) {

    console.log(this.dataDialog);

    this.titleModal   =   dataDialog.city == null ? 'Crear Ciudad' : 'Editar Ciudad';
    this.city         =   dataDialog.city != null ? dataDialog.city : this.city;
  }

  createEditInfo() {

    if(this.city == null) {
      this.error    =   true;
      this.msjError =   "Los campos son obligatorios";
      return false;
    }

    if(this.city.description == null || this.city.description == "" ) {
      this.error      =   true;
      this.msjError   =   "El campo Descripción es obligatorio";
      return false;
    }

    this.cityServices.createEditCity(this.city).subscribe(
      data => {
        this.error      =   false;
        this.msjError   =   "";
        this.dialogRef.close();
      },
      error => {
        this.error      =   false;
        this.msjError   =   error;
      }
    )
  }

}
