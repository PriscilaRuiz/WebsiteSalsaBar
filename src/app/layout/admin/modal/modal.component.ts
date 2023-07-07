import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatosService } from 'src/app/services/datos.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @ViewChild('contentAddUser') contentAdd: any;
  usuarios:any[] = [];
  usuario = {
    _id : 0,
    nombre : '',
    correo : '',
    password : ''
  }
  ngOnInit(){
    this.llamarUsuarios();
  }
  constructor(config: NgbModalConfig, private modal: NgbModal, private datos: DatosService){
  }
  openModalAddUsuario(){
    this.modal.open(this.contentAdd);
  }
  llamarUsuarios(){
    this.datos.getUsuarios().subscribe(usuarios =>{
      this.usuarios = usuarios;
    });
  }
  addUser(form:any){
    console.log(form.value)
    this.usuario.nombre = form.value.nombre;
    this.usuario.correo = form.value.correo;
    this.usuario.password = form.value.password;
    let ultimoId = 0;
    if(this.usuarios.length > 0){
      for (const usuario of this.usuarios) {
        if (usuario._id > ultimoId) {
          ultimoId = usuario._id;
        }
      }
    }else{
    this.usuario._id = 1;
    }
    this.usuario._id = ultimoId + 1;
    console.log(this.usuario);
    this.datos.addUser(this.usuario);
  }

}
