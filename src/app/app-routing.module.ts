import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './layout/users/users.component';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './layout/admin/dashboard/dashboard.component';
import { UsuariosComponent } from './layout/admin/usuarios/usuarios.component';
import { ProductosComponent } from './layout/admin/productos/productos.component';
import { HistorialComponent } from './layout/admin/historial/historial.component';

const routes: Routes = [
  { path: '', component: UsersComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'ventas', component: HistorialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
