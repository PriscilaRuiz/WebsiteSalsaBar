import { Component } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DatosService } from 'src/app/services/datos.service';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  categorias = ['Salsas','Salchis','Combos','Bebidas','Personal'];
  listar_o_agregar: number = 0;
  total_ventas :number = 0;
  total_ordenes = 0;
  array_ordenes:any[] = [];
  activeIndex = -1;
  categoriaInicial!:string;

  constructor(private loginService: LoginServiceService,private router:Router, private datos: DatosService){

  }
  ngOnInit(){
    if(localStorage.getItem("token") === null && localStorage.getItem("expire_in") === null){
      this.router.navigateByUrl('/login');
    }
    this.llamarDatos();
  }
  llamarDatos(){
    this.datos.getOrdenes().subscribe(ordenes => {
      this.total_ordenes = ordenes.length;
      let total = ordenes.reduce((total,orden)=> total + orden.total,0);
      this.total_ventas = total;
      this.array_ordenes = ordenes;
    });
    console.log(this.array_ordenes);
  }
  cerrarSesion(){
    this.loginService.logout()
    this.router.navigateByUrl('/login');
  }
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  cambiarDivCategorias(){
    this.activeIndex = -1;
    if(this.listar_o_agregar == 0){
      this.listar_o_agregar = 1;
    } else if(this.listar_o_agregar == 1){
      this.listar_o_agregar = 0;
    }else if(this.listar_o_agregar == 2){
      this.listar_o_agregar = 0;
    }
  }
  guardarCategoria(form:any){
    if(form.value.nombreCategoria != null){
      this.categorias.push(form.value.nombreCategoria);
    }else if(form.value.categoriaEditar != null){
      if(this.categorias.includes(this.categoriaInicial)){
        this.categorias[this.categorias.indexOf(this.categoriaInicial)] = form.value.categoriaEditar;
      }
    }
    this.listar_o_agregar = 0;
  }
  editarCategoria(categoria:string){
    this.activeIndex = -1; 
    this.listar_o_agregar = 2;
    this.categoriaInicial = categoria;
    
  }
  eliminarCategoria(categoria:string){
    this.activeIndex = -1; 
    let index = this.categorias.indexOf(categoria);
    this.categorias.splice(index,1);
  }
  changeActiveIndex(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = -1; 
    } else {
      this.activeIndex = index;
    }
  }
  generarPDF() {
    const sectionToPrint = document.getElementById("content") as HTMLElement;
  
    html2canvas(sectionToPrint).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('documento.pdf');
    });
  }
}
