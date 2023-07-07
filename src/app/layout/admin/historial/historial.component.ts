import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  constructor(private loginService: LoginServiceService,private router:Router){

  }
  ngOnInit(){
    if(localStorage.getItem("token") === null && localStorage.getItem("expire_in") === null){
      this.router.navigateByUrl('/login');
    }
  }
  cerrarSesion(){
    this.loginService.logout()
    this.router.navigateByUrl('/login');
  }
}
