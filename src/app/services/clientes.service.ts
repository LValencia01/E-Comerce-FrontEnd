import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente.models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl: string = environment.apiUrl + 'clientes/';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.apiUrl);
  }
  createCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.apiUrl, cliente)
  }

  updateCliente(cliente: Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiUrl}${cliente.id}`, cliente);

  }

  deleteCliente(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.apiUrl}${id}`);
  }

}
