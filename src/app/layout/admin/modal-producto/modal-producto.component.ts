import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.css'],
  
})
export class ModalProductoComponent {
  show = true;
  productos :any[] = []; 
  @ViewChild('contentAddProduct') contentAddProduct: any;
  activeIndex = 0;
  buttons = [
    { name: 'Personal' },
    { name: 'Salchis' },
    { name: 'Combos' },
    { name: 'Bebidas' },
    { name: 'Salsas' }

  ];
  constructor(config: NgbModalConfig, private modal: NgbModal, private datos: DatosService){

  }
  ngOnInit(){
    this.llamarProductos()
  }
  changeActiveIndex(index: number) {
    this.activeIndex = index;
  }
  llamarProductos(){
    this.datos.getProductos().subscribe(productos =>{
      this.productos = productos;
    });
  }
  openModalAddProductos(){
    this.modal.open(this.contentAddProduct);
  }

  addProducto(form:any){
    let ultimoId = 0;
    let categoria = '';
    if(this.productos.length > 0){
      for (const usuario of this.productos) {
        if (usuario._id > ultimoId) {
          ultimoId = usuario._id;
        }
      }
    }else{
      ultimoId = 1;
    }
    if(this.activeIndex == 0){
      categoria = "Personal"
    }else if(this.activeIndex == 1){
      categoria = "Salchis"
    }else if(this.activeIndex == 2){
      categoria = "Combos"
    }else if(this.activeIndex == 3){
      categoria = "Bebidas"
    }else if(this.activeIndex == 4){
      categoria = "Salsas"
    }
    form.value._id = ultimoId + 1;
    form.value.categoria = categoria;
    this.datos.addProducto(form.value);
  }
}
