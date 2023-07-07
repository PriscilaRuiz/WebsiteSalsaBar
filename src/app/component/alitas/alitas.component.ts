import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-alitas',
  templateUrl: './alitas.component.html',
  styleUrls: ['./alitas.component.css'],
})
export class AlitasComponent implements OnInit{
  isShow = false;
  saladas: any = [];
  dulces: any = [];
  picantes: any = [];
  personales: any = [];
  falso: any = [];
  id: any;
  existentes:any;
  activeButton = 'Saladas';
  selectedAlita = 'Saladas';
  selectedName: any;
  selectedCategory: any;
  selectedPrice: any;
  selectedImage: any;
  userIP='';

  constructor(private http: HttpClient,private modal:NgbModal,private datosService: DatosService){}
  ngOnInit(): void {
    this.datosService.getAlitasSaladas()
      .subscribe(saladas=>{
        this.saladas=saladas;
        console.log(saladas);
      })

    this.datosService.getAlitasDulces()
      .subscribe(dulces=>{
        this.dulces=dulces;
        console.log(dulces);
      })

    this.datosService.getAlitasPicantes()
      .subscribe(picantes=>{
        this.picantes=picantes;
        console.log(picantes);
      })

    this.datosService.getPersonal()
      .subscribe(datos=>{
        this.personales=datos;
        console.log(datos);
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
    this.getIdentificador();

  }

  getIdentificador(){
    return this.http.get('https://jsonip.com/')
    .subscribe((respuesta:any)=>{
      this.userIP = respuesta.ip;
    }
    )
  }

  openSM(contenido: any,nombre:any,categoria:any,imagen:any){
    this.selectedName = nombre;
    this.selectedCategory = categoria;
    this.selectedImage = imagen;
    this.modal.open(contenido,{size:'lg'});
  }

  changeActiveButton(button: string) {
    this.activeButton = button;
    this.selectedAlita = button;
  }
  changeActiveCheck(item: number) {
    const index = this.personales.indexOf(item);
    console.log(index);
    if (index==0) {
      this.selectedPrice=17.5;
      console.log(this.selectedPrice);
    }else{
      this.selectedPrice=23.5;
      console.log(this.selectedPrice);
    }
  }

  moreSpecf(){
    const textarea = document.querySelector('#text-especf') as HTMLElement;
    const divcontainer = document.querySelector('#body-especf') as HTMLElement;
    textarea?.classList.toggle('showtxt');
    divcontainer?.classList.toggle('withtxtarea');
  }


  guardar(formulario:NgForm){

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
