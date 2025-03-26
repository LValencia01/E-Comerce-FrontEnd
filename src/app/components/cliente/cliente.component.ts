import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/cliente.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-cliente',
  standalone: false,
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  clientes: Cliente[]=[];
  clienteForm: FormGroup;
  showForm: boolean=false;
  textModal: string ="Nuevo cliente";
  isEditMode:boolean=false;
  selectedCliente: Cliente | null=null;

  constructor(private clienteService: ClientesService, private formBuilder: FormBuilder){
    this.clienteForm=formBuilder.group({
      idCliente:[null],
      nombre:['', [Validators.required, Validators.maxLength(50)]],
      apellido:['', [Validators.required, Validators.maxLength(50)]],
      eMail:['', [Validators.required, Validators.maxLength(100)]],
      telefono:['',[Validators.required, Validators.maxLength(50)]],
      direccion:['', [Validators.required, Validators.maxLength(100)]]
    })
  }

  ngOnInit(): void {   
    this.loadClientes();
  }
  loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: data => {
        this.clientes = data;
        console.log(data);
      }
    })
  }
}
