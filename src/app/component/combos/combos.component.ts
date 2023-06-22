import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-combos',
  templateUrl: './combos.component.html',
  styleUrls: ['./combos.component.css']
})
export class CombosComponent {
  isShow = false;
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

  selectedSalsas: string[] = [];
  constructor(private modal:NgbModal){

  }
  changeActiveIndex(index: number) {
    this.activeIndex = index;
  }
  ngOnInit(): void {
  }
  openSM(contenido: any){
    this.modal.open(contenido,{size:'lg'});
  }
  moreSpecf(){
    this.isShow = !this.isShow;
  }
}
