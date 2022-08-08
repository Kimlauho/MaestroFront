import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { CitiesComponent } from './app/cities/cities.component';
import { CitiesDialog } from './app/cities/cities.component';
import { SellersDialog } from './app/sellers/sellers.component';
import { SellersComponent } from './app/sellers/sellers.component';
import { IndexComponent } from './app/index/index.component';



@NgModule({
  declarations: [
    ComponentsComponent,
    CitiesComponent,
    CitiesDialog,
    SellersDialog,
    SellersComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatListModule,
    MatDialogModule
  ]
})
export class ComponentsModule { }
