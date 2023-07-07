import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './component/slider/slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlitasComponent } from './component/alitas/alitas.component';
import { SalchisComponent } from './component/salchis/salchis.component';
import { CombosComponent } from './component/combos/combos.component';
import { BebidasComponent } from './component/bebidas/bebidas.component';
import { UsersComponent } from './layout/users/users.component';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './layout/admin/dashboard/dashboard.component';
import { HistorialComponent } from './layout/admin/historial/historial.component';
import { ProductosComponent } from './layout/admin/productos/productos.component';
import { UsuariosComponent } from './layout/admin/usuarios/usuarios.component';
import { SuscripcionComponent } from './component/suscripcion/suscripcion.component';
import { FooterComponent } from './component/footer/footer.component';
import { ModalComponent } from './layout/admin/modal/modal.component';
import { ModalProductoComponent } from './layout/admin/modal-producto/modal-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlitasComponent,
    SalchisComponent,
    CombosComponent,
    BebidasComponent,
    UsersComponent,
    LoginComponent,
    DashboardComponent,
    HistorialComponent,
    ProductosComponent,
    UsuariosComponent,
    SuscripcionComponent,
    FooterComponent,
    ModalComponent,
    ModalProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    SliderComponent,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
