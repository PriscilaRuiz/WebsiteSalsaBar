import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { NgForm } from '@angular/forms';
import { DatosService } from 'src/app/services/datos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent {
  activeIndex = 0;
  buttons = [
    { name: 'Dulces' },
    { name: 'Saladas' },
    { name: 'Picantes' }
  ];
  salsas = [
    { value: 'Tocino', imageUrl: './assets/img/salsa_tocino.png'},
    { value: 'Al Ajo', imageUrl: './assets/img/salsa_ajo.png'},
    { value: 'Oriental', imageUrl: './assets/img/salsa_oriental.png'},
    { value: 'Criolla', imageUrl: './assets/img/salsa_criolla.png'},
    { value: 'Chimichurri', imageUrl: './assets/img/salsa_chimichurri.png'},
    { value: 'Olivo', imageUrl: './assets/img/salsa_olivo.png'},
    { value: 'Crema Ajo', imageUrl: './assets/img/salsa_crema_ajo.png'},
  
  ];
  selectedName: any;
  userIP='';
  falso: any = [];
  id: any;
  existentes:any;
  selectedCategory: any;
  selectedImage: any;
  selectedPrice: any;
  selectedCanti_a: any;
  selectedCanti_c: any;
  selectedSalsas: string[] = [];
  combos:any = [];
  constructor(private http: HttpClient,private modal:NgbModal,private datosService: DatosService){

  }

  getIdentificador(){
    return this.http.get('https://jsonip.com/')
    .subscribe((respuesta:any)=>{
      this.userIP = respuesta.ip;
    }
    )
  }

  changeActiveIndex(index: number) {
    this.activeIndex = index;
  }
  ngOnInit(): void {
    this.datosService.getCombos()
      .subscribe(combos=>{
        this.combos = combos;
        console.log(combos);
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
  openSM(contenido: any,nombre:any,cantidad_a:any,cantidad_c:any,categoria:any,imagen:any,precio:any){
    this.selectedName = nombre;
    this.selectedCategory = categoria;
    this.selectedImage = imagen;
    this.selectedPrice = precio;
    this.selectedCanti_a = cantidad_a;
    this.selectedCanti_c = cantidad_c;
    this.modal.open(contenido,{size:'lg'});
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
      canti_c:this.selectedCanti_c,
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
          canti_c:this.selectedCanti_c,
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
