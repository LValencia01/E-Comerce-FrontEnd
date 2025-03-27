import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/productos.service';
import { Productos } from '../../models/producto.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductosComponent implements OnInit {

  productos: Productos[] = [];
  productoForm: FormGroup;
  showModal: boolean = false;
  showForm: boolean = false;
  modalTitle: string = 'Agregar Producto';
  isEditMode: boolean = false;
  selectedProductos: Productos | null = null;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
    this.productoForm = this.formBuilder.group({
      idProducto: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      precio: ['', [Validators.required, Validators.maxLength(100)]],
      stock: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  openModal(): void {
    this.showModal = true;
    this.modalTitle = 'Agregar Producto';
    this.isEditMode = false;
    this.productoForm.reset();
  }

  closeModal(): void {
    this.showModal = false;
  }

  editProducto(producto: Productos): void {
    this.showModal = true;
    this.modalTitle = 'Editar Producto';
    this.isEditMode = true;
    this.productoForm.patchValue(producto);
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
        const producto = this.productoForm.value;
        if (this.isEditMode) {
            console.log('Producto a actualizar:', producto);
            this.productoService.updateProductos(producto).subscribe({
          next: () => {
            this.loadProductos();
            this.closeModal();
            Swal.fire('Producto editado', 'El producto ha sido editado correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al actualizar producto:', error);
            this.mostrarError('Error al actualizar producto', error);
          }
        });
      } else {
        this.productoService.createProductos(producto).subscribe({
          next: () => {
            this.loadProductos();
            this.closeModal();
            Swal.fire('Producto creado', 'El producto ha sido creado correctamente.', 'success');
          },
          error: (error) => {
            console.error('Error al crear producto:', error);
            this.mostrarError('Error al crear producto', error);
          }
        });
      }
    }
  }

  deleteProducto(idProducto: number): void {
    Swal.fire({
      title: 'Eliminar producto',
      text: '¿Estás seguro de que quieres eliminar este producto?',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProductos(idProducto).subscribe({
          next: () => {
            this.productos = this.productos.filter((p) => p.idProducto !== idProducto);
            Swal.fire('Producto eliminado', '', 'success');
          },
          error: (error) => {
            console.error('Error al eliminar producto:', error);
            this.mostrarError('Error al eliminar producto', error);
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