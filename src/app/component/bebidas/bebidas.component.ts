import { Component } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.component.html',
  styleUrls: ['./bebidas.component.css']
})
export class BebidasComponent {
  bebidas: any = [];
  cervezas: any = [];
  refrescos: any = [];
  activeButton = 'Gaseosas';
  selectedBebida = 'Gaseosas';
  selectedName: any;
  selectedCategory: any;
  selectedPrice:any;
  selectedImage:any;
  userIP='';
  falso: any = [];
  id: any;
  existentes:any;

  constructor(private datosService: DatosService,private http: HttpClient){}
  ngOnInit(): void {
    this.datosService.getBebidas()
      .subscribe(bebidas=>{
        this.bebidas=bebidas;
        console.log(bebidas);
      })

    this.datosService.getCerveza()
      .subscribe(cervezas=>{
        this.cervezas=cervezas;
        console.log(cervezas);
      })

    this.datosService.getRefrescos()
      .subscribe(refrescos=>{
        this.refrescos=refrescos;
        console.log(refrescos);
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

  changeActiveButton(button: string) {
    this.activeButton = button;
    this.selectedBebida = button;
  }

  getIdentificador(){
    return this.http.get('https://jsonip.com/')
    .subscribe((respuesta:any)=>{
      this.userIP = respuesta.ip;
    }
    )
  }

  guardar(nombre:any,categoria:any,precio:any,imagen:any){
    this.selectedName = nombre;
    this.selectedCategory = categoria;
    this.selectedPrice = precio;
    this.selectedImage = imagen;

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

}
