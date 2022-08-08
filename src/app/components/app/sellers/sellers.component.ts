import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { City } from '../../models/city.model';
import { Seller } from '../../models/seller.model';
import { CityService } from '../../services/city.service';
import { SellerService } from '../../services/seller.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss']
})
export class SellersComponent implements OnInit {

  sellers: Seller[] = [];
  cities: City[] = [];

  constructor(
    private sellerService: SellerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers() {
    this.sellerService.getSellers().subscribe(
      data => {
        this.sellers = data;
      });
  }

  deleteSeller(id: Seller["code"]) {
    this.sellerService.deleteSeller(id).subscribe(
      data => {
        alert(data.nota);
        this.getSellers();
      });
  }

  openDialog(seller: Seller) {
    const dialogRef = this.dialog.open(SellersDialog, {
      width: '350px',
      data: {seller},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any[]) => {
      this.getSellers();
    });
  }

}

@Component({
  selector: 'app-sellers-dialog',
  templateUrl: 'sellers.dialog.html',
  styleUrls: ['./sellers.component.scss', '../../../app.component.scss']
})
export class SellersDialog {

  cityId: number = 0;
  cities: City[] = [];
  error: boolean = false;
  msjError: string = "";

  seller: Seller = {
    code: null,
    name: '',
    lastName: '',
    document: '',
    cityId: 0
  };

  titleModal: String = '';

  constructor(
    private sellerServices: SellerService,
    private cityServices: CityService,
    public dialogRef: MatDialogRef<SellersDialog>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any
  ) {

    console.log(this.dataDialog);

    this.titleModal   =   dataDialog.seller == null ? 'Create Seller' : 'Edit Seller';
    this.seller         =   dataDialog.seller != null ? dataDialog.seller : this.seller;
    this.getCities();
  }

  selectedCity(){
    this.seller.cityId =  this.cityId;
  }

  getCities() {
    this.cityServices.getCities().subscribe(
      data => {
        this.cities = data;
      });
  }

  createEditInfo() {
    console.log("2 ciudad: " ,this.cityId);
    this.seller.cityId =  this.cityId;
    if(this.seller.name == null || this.seller.name == "" ) {
      this.error      =   true;
      this.msjError   =   "El campo Nombre es obligatorio";
      return false;
    }

    if(this.seller.lastName == null || this.seller.lastName == "" ) {
      this.error      =   true;
      this.msjError   =   "El campo Apellido es obligatorio";
      return false;
    }

    if(this.seller.document == null || this.seller.document == "" ) {
      this.error      =   true;
      this.msjError   =   "El campo Documento es obligatorio";
      return false;
    }
    console.log(this.seller);
    this.sellerServices.createEditSeller(this.seller).subscribe(
      data => {
        this.error      =   false;
        this.msjError   =   "";
        alert("El vendedor ha sido registrado exitosamente");
        this.dialogRef.close();
      },
      error => {
        this.error      =   false;
        this.msjError   =   error;
      }
    )
  }

}
