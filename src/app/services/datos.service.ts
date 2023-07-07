import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(private http: HttpClient) { }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getProductos() {
    return this.http.get('http://localhost:3000/api/productos')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  estadoFalso() {
    return this.http.get('http://localhost:3000/api/ordenes')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta.map(respuesta=>{
            return {
              estado:respuesta.estado
            }
          });
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getPedidosFalso() {
    return this.http.get('http://localhost:3000/api/ordenes')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta.map(respuesta=>{
            return {
              pedidos:respuesta.pedido,
            }
          });
        })
      );
  }
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ordenFalsa() {
    return this.http.get('http://localhost:3000/api/ordenes/ordenFalsa')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta.map(respuesta=>{
            return {
              id:respuesta.id,
              pedidos:respuesta.pedido
            }
          });
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAlitasSaladas() {
    return this.http.get('http://localhost:3000/api/productos/alitas_saladas')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAlitasDulces() {
    return this.http.get('http://localhost:3000/api/productos/alitas_dulces')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getAlitasPicantes() {
    return this.http.get('http://localhost:3000/api/productos/alitas_picantes')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getSalchis() {
    return this.http.get('http://localhost:3000/api/productos/salchis')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getBebidas() {
    return this.http.get('http://localhost:3000/api/productos/bebidas')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getCerveza() {
    return this.http.get('http://localhost:3000/api/productos/cerveza')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getRefrescos() {
    return this.http.get('http://localhost:3000/api/productos/refrescos')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
      );
  }

  getCombos(){
    return this.http.get('http://localhost:3000/api/productos/combos')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  addProducto(producto:any):void{
    console.log("producto in service: ",producto);
    this.http.post("http://localhost:3000/api/productos",producto).subscribe(
      (producto) =>{
        console.log("OK");
      },
      (error)=>{
        console.log(error);
      }
    )
  }
  deleteProducto(id:number){
    this.http.delete(`http://localhost:3000/api/productos/${id}`)
    .subscribe(
      ()=>{
        console.log();
      },
      (error)=>{
        console.log("error al eliminar producto",error);
      }
    )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createOrden(orden:any){
    return this.http.post('http://localhost:3000/api/ordenes/add', orden);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  editarOrden(orderId:string,nuevodato:any){
    return this.http.put(`http://localhost:3000/api/ordenes/${orderId}/edit`,nuevodato);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  finalizarOrden(orderId:string,nuevodato:any){
    return this.http.put(`http://localhost:3000/api/ordenes/${orderId}/finalizar`,nuevodato);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  finalizarOrden2(orderId:string,estado:any){
    return this.http.put(`http://localhost:3000/api/ordenes/${orderId}/subido`,estado);
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getOrdenes(){
    return this.http.get('http://localhost:3000/api/allOrders')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getPersonal(){
    return this.http.get('http://localhost:3000/api/productos/personales')
      .pipe(
        map((respuesta:any[])=>{
          return respuesta;
        })
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getUsuarios(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/login/usuarios');
  }

  addUser(usuario:any):void{
    this.http.post("http://localhost:3000/login/usuarios",usuario).subscribe(
      (user) =>{
        return "OK"
      },
      (error)=>{
        console.log(error);
      }
    );
  }
  deleteUser(id:number):void{
    this.http.delete(`http://localhost:3000/api/login/usuarios/${id}`)
    .subscribe(
      ()=>{
        console.log('OK')
      },
      (error)=>{
        console.log("error al eliminar usuario",error);
      }
    )
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



}
