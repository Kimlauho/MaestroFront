import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './app/cities/cities.component';
import { IndexComponent } from './app/index/index.component';
import { SellersComponent } from './app/sellers/sellers.component';
import { ComponentsComponent } from './components.component';

const routes: Routes = [

  {
    path: '', component: ComponentsComponent,  children: [
      { path: '', component: IndexComponent },
      { path: 'cities', component: CitiesComponent },
      { path: 'sellers', component: SellersComponent },
    ]
  }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
