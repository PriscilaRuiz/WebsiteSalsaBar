import { Component,OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

@Component({
  selector: 'app-alitas',
  templateUrl: './alitas.component.html',
  styleUrls: ['./alitas.component.css'],
})
export class AlitasComponent {
  isShow = false;
  constructor(private modal:NgbModal){

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
