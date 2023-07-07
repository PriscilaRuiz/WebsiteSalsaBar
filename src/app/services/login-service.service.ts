import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/models/user.model';
import { JwtResponse } from 'src/models/jwtResponse.model';
import { tap } from 'rxjs';
import { Observable,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private url = "http://localhost:3000/login"
  authSubject = new BehaviorSubject(false);
  private token!: string;

  constructor(private http: HttpClient) { }

  login(user: User):Observable<JwtResponse>{
    return this.http.post<JwtResponse>(this.url,user)
    .pipe(tap(
      (res:JwtResponse)=>{
        if(res){
          console.log(res.dataLogin);
          this.saveToken(res.dataLogin.accesstoken,res.dataLogin.expire);
        }
      }
    ))
  }

  logout():void{
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('expire_in');
  }
  private saveToken(token: string, expire_in: number):void{
    localStorage.setItem("token",token);
    localStorage.setItem("expire_in",String(expire_in));
  }

  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem("token")!;
    }
    return this.token
  }
}
