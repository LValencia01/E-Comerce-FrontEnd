import { Injectable } from '@angular/core';
import { Productos } from '../models/producto.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl: string = environment.apiUrl + 'productos/';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.apiUrl);
  }
  createProductos(productos:Productos):Observable<Productos>{
    return this.http.post<Productos>(this.apiUrl, productos)
  }

  updateProductos(productos: Productos):Observable<Productos>{
    return this.http.put<Productos>(`${this.apiUrl}${productos.idProducto}`, productos);

  }

  deleteProductos(idProducto: number):Observable<Productos>{
    return this.http.delete<Productos>(`${this.apiUrl}${idProducto}`);
  }

}
