import { CommonModule } from '@angular/common';
import { Component,NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  @ViewChild(ModalProductoComponent) modalProductsComponent!: ModalProductoComponent;
  productos: any[]=[];
  constructor(private loginService: LoginServiceService,private router:Router, private datos:DatosService){

  }
  ngOnInit(){
    if(localStorage.getItem("token") === null && localStorage.getItem("expire_in") === null){
      this.router.navigateByUrl('/login');
    }
    this.llenarData()
  }
  cerrarSesion(){
    this.loginService.logout()
    this.router.navigateByUrl('/login');
  }

  llenarData() {
    this.datos.getProductos().subscribe(productos =>{
      this.productos = productos;
      console.log(this.productos);
    });

  }
  deleteProductos(id: number){
   this.datos.deleteProducto(id);
   this.llenarData();
  }
  openModalAddProductos(){
    this.modalProductsComponent.openModalAddProductos();
  }
}
