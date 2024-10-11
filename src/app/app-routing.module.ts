import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioComponentComponent } from './component/servicio-component/servicio-component.component';
import { AddComponent } from './component/add/add.component';

const routes: Routes = [
  {path: '', component: ServicioComponentComponent},
{path: 'add', component: AddComponent},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
