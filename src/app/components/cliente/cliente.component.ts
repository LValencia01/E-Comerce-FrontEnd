import { Component, OnInit } from '@angular/core';
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
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteForm: FormGroup;
  showModal: boolean = false;
  modalTitle: string = 'Agregar Cliente';
  isEditMode: boolean = false;
  selectedCliente: Cliente | null = null;


  constructor(private clienteService: ClientesService, private formBuilder: FormBuilder) {
    this.clienteForm = this.formBuilder.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      eMail: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.modalTitle = 'Agregar Cliente';
    this.isEditMode = false;
    this.clienteForm.reset();
  }

  closeModal(): void {
    this.showModal = false;
  }

  editCliente(cliente: Cliente): void {
    this.showModal = true;
    this.modalTitle = 'Editar Cliente';
    this.isEditMode = true;
    this.clienteForm.patchValue(cliente);
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente = this.clienteForm.value;
      if (this.isEditMode) {
        this.clienteService.updateCliente(cliente).subscribe({
          next: () => {
            this.loadClientes();
            this.closeModal();
            Swal.fire('Cliente editado', 'El cliente ha sido editado correctamente.', 'success'); // Aviso de éxito
          },
          error: (error) => {
            console.error('Error al actualizar cliente:', error);
            this.mostrarError('Error al actualizar cliente', error);
          }
        });
      } else {
        this.clienteService.createCliente(cliente).subscribe({
          next: () => {
            this.loadClientes();
            this.closeModal();
            Swal.fire('Cliente creado', 'El cliente ha sido creado correctamente.', 'success'); // Aviso de éxito
          },
          error: (error) => {
            console.error('Error al crear cliente:', error);
            this.mostrarError('Error al crear cliente', error);
          }
        });
      }
    }
  }

  deleteCliente(id: number): void {
    Swal.fire({
      title: 'Eliminar cliente',
      text: '¿Estás seguro de que quieres eliminar este cliente?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.deleteCliente(id).subscribe({
          next: () => {
            this.clientes = this.clientes.filter((c) => c.id !== id);
            Swal.fire('Cliente eliminado', '', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
            this.mostrarError('Error al eliminar cliente', error);
          }
        });
      }
    });
  }

  mostrarError(titulo: string, error: any): void {
    let mensaje = 'Ocurrió un error inesperado.';
    if (error && error.error && error.error.message) {
      mensaje = error.error.message;
    } else if (error && error.message) {
      mensaje = error.message;
    }
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error'
    });
  }
}