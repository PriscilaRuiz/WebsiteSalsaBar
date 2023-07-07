import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  @ViewChild(ModalComponent) modalComponent!: ModalComponent;
  usuarios: any[] = [];
  constructor(private loginService: LoginServiceService,private router:Router, private datos: DatosService,private chageDetector: ChangeDetectorRef){

  }
  ngOnInit(){
    if(localStorage.getItem("token") === null && localStorage.getItem("expire_in") === null){
      this.router.navigateByUrl('/login');
    }
    this.llamarUsuarios();
  }
  cerrarSesion(){
    this.loginService.logout()
    this.router.navigateByUrl('/login');
  }
  llamarUsuarios(){
    this.datos.getUsuarios().subscribe(usuarios =>{
      this.usuarios = usuarios;
    });
  }
  deleteUsuario(id:number){
    this.datos.deleteUser(id);
    this.llamarUsuarios();
    this.chageDetector.detectChanges();
  }
  openModalUserAdd(){
   this.modalComponent.openModalAddUsuario();
  }
  updateUsuario(){

  }
}
