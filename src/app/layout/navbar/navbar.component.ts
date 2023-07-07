
import { Component, HostListener,OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from 'src/app/services/datos.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{ 
  isShow = false;
  toolbarfixed:boolean = false;
  @HostListener('window:scroll',['$event']) onscroll(){
    if(window.scrollY > 150){
      this.toolbarfixed = true;
    }else{
      this.toolbarfixed = false;
    }
  }

  productos: any = [];
  cars: any = [];
  resultados: any = [];
  personales: any = [];
  terminoBusqueda: string = '';
  carritos: any = [];

  falso: any = [];
  id: any;
  existentes:any;
  userIP='';

  productoNombre:any;
  productoPrecio:any;
  seleccion:any;
  productoCategoria:any;
  productoImagen:any;
  registers:FormGroup;

  constructor(private http: HttpClient,private datosService: DatosService,private modal:NgbModal,private formBuilder:FormBuilder){
    this.registers = this.formBuilder.group({
      nombre:['', Validators.required],
      numero:['', Validators.required],
      direccion:['', Validators.required],
      formaPago:[''],
      doc:['', Validators.required],
      nombredoc:['', Validators.required],
    });
  }

  submitForm() {
    if (this.registers.valid) {
      console.log('Datos del formulario:', this.registers.value);
    } else {
      console.log('Formulario inválido. Por favor, complete todos los campos requeridos.');
    }
  }

  ngOnInit(): void {
    this.datosService.getProductos()
      .subscribe(productos=>{
        this.productos=productos;
        console.log(productos);
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

    this.datosService.getPersonal()
      .subscribe(personales=>{
        this.personales = personales;
      })

    this.datosService.getPedidosFalso()
    .subscribe(ordenes=>{
      console.log(ordenes[0].pedidos)
      this.cars = ordenes[0].pedidos;
    })

  }

  getIdentificador(){
    return this.http.get('https://jsonip.com/')
    .subscribe((respuesta:any)=>{
      this.userIP = respuesta.ip;
    }
    )
  }

  eliminarCarrito(item: number) {
    const index = this.cars.indexOf(item); // Obtener el índice del elemento en el arreglo
    if (index !== -1) {
      this.cars.splice(index, 1); // Eliminar el elemento del arreglo
    }
  }

  incrementarCantidad(car: any) {
    car.cantidad++;
  }

  decrementarCantidad(car: any) {
    if (car.cantidad > 1) {
      car.cantidad--;
    }
    
  }

  calcularTotalPrecios(): number {
    let total = 0;

    for (let car of this.cars) {
      total += parseFloat(car.precio) * parseFloat(car.cantidad);
    }

    return total;
  
  }

  calcularCantidadPrecios(): number {
    let cantidad = 0;

    for (let car of this.cars) {
      cantidad += parseFloat(car.cantidad);
      
    }

    return cantidad;
  }

  Carro(contenido: any){
    this.modal.open(contenido,{size:'lg'});
  }

  Buscador(contenido: any){
    this.modal.open(contenido,{size:'lg'});
  }

  Pagar(cuenta: any){
    this.modal.open(cuenta,{size:'lg'});
    console.log(this.cars);
  }

  buscarProductos() {
    const busqueda = this.terminoBusqueda.toLowerCase();
    console.log('Término de búsqueda:', busqueda);

    this.resultados = this.productos.filter(producto =>
      producto.nombre.toLowerCase().indexOf(busqueda) !== -1
    );

  }

  changeActiveCheck(item: number) {
    const index = this.personales.indexOf(item);
    console.log(index);
    if (index==0) {
      this.seleccion=17.5;
      console.log(this.seleccion);
    }else{
      this.seleccion=23.5;
      console.log(this.seleccion);
    }
  }

  guardar(){
    
    const Item = {
      nuevo:this.cars
    }
    const dato = {
      estado:true,
      total:this.calcularTotalPrecios(),
      persona:this.registers.value.nombre,
      celular:this.registers.value.numero,
      direccion:this.registers.value.direccion
    }
    
    this.datosService.finalizarOrden(this.id, Item)
      .subscribe((response) => {
        console.log(response);
      });


    this.datosService.finalizarOrden2(this.id, dato)
      .subscribe((response) => {
        console.log(response);
        window.location.reload();
      });
  }

  agregar(nombre:any,categoria:any,precio:any,imagen:any){

    this.productoNombre = nombre;
    this.productoCategoria = categoria;
    this.productoPrecio = precio||this.seleccion;
    this.productoImagen = imagen;



    const Item = {
      nombre: this.productoNombre,
      categoria:this.productoCategoria,
      precio:this.productoPrecio,
      cantidad:'1',
      imagen:this.productoImagen
    }

    const neworden = {
      persona: "",
      ip: this.userIP,
      celular:"",
      fecha: new Date(),
      estado:false,
      direccion:"",
      total:"",
      pedido:[Item]
    };

    if (!this.falso) {
      const Item = {
        nuevo:{
          nombre: this.productoNombre,
          categoria:this.productoCategoria,
          precio:this.productoPrecio,
          cantidad:'1',
          imagen:this.productoImagen
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
