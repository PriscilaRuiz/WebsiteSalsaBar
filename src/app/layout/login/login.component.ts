import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginServiceService, private router:Router){

  }
  ngOnInit(){
    if(localStorage.getItem("token")&& localStorage.getItem("expire_in")){
      this.router.navigateByUrl('/dashboard');
    }
  }
  onLogin(form:any):void{
    console.log(form.value);
    this.loginService.login(form.value).subscribe(res=>{
      this.router.navigateByUrl('/dashboard');
    })
  }
}
