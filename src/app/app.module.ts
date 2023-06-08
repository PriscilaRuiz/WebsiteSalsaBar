import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './component/slider/slider.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlitasComponent } from './component/alitas/alitas.component';
import { SalchisComponent } from './component/salchis/salchis.component';
import { CombosComponent } from './component/combos/combos.component';
import { BebidasComponent } from './component/bebidas/bebidas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlitasComponent,
    SalchisComponent,
    CombosComponent,
    BebidasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SliderComponent,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
