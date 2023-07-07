import { Component } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-salchis',
  templateUrl: './salchis.component.html',
  styleUrls: ['./salchis.component.css']
})
export class SalchisComponent {
  salchis: any = [];
  selectedName: any;
  selectedCategory: any;
  selectedPrice:any;
  selectedImage:any;
  userIP='';
  falso: any = [];
  id: any;
  existentes:any;

  constructor(private datosService: DatosService,private http: HttpClient,){}
  ngOnInit(): void {
    this.datosService.getSalchis()
      .subscribe(salchis=>{
        this.salchis=salchis;
        console.log(salchis);
      })

    this.datosService.ordenFalsa()
      .subscribe(falsos=>{
        this.id =falsos[0].id;
        this.existentes =falsos[0].pedidos;
      })

    this.datosService.estadoFalso()
      .subscribe(ordenes=>{
        this.falso = ordenes[0].estado;
      })
      this.getIdentificador()
  }

  guardar(nombre:any,categoria:any,precio:any,imagen:any){
    this.selectedName = nombre;
    this.selectedCategory = categoria;
    this.selectedPrice = precio;
    this.selectedImage = imagen

    const Item = {
      nombre: this.selectedName,
      categoria:this.selectedCategory,
      precio:this.selectedPrice,
      cantidad:'1',
      imagen:this.selectedImage
    }

    const neworden = {
      persona: "",
      ip: this.userIP,
      celular:"",
      fecha: new Date(),
      estado:false,
      direccion:"",
      total:'',
      pedido:[Item]
    };

    if (!this.falso) {
      const Item = {
        nuevo:{
          nombre: this.selectedName,
          categoria:this.selectedCategory,
          precio:this.selectedPrice,
          cantidad:'1',
          imagen:this.selectedImage
        },
        existente:this.existentes
      }
      
      this.datosService.editarOrden(this.id, Item)
        .subscribe((response) => {
          console.log(response);
          window.location.reload();
        });
    } 
    if(this.falso) {
      this.datosService.createOrden(neworden)
      .subscribe((response)=>{
        console.log(response);
        window.location.reload();
    })
    }
  }

  getIdentificador(){
    return this.http.get('https://jsonip.com/')
    .subscribe((respuesta:any)=>{
      this.userIP = respuesta.ip;
    }
    )
  }



}
