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
  showForm: boolean = false;
  textModal: string = "Nuevo producto";
  isEditMode: boolean = false;
  selectedProductos: Productos | null = null;

  constructor(private productoService: ProductoService, private formBuilder: FormBuilder) {
    this.productoForm = formBuilder.group({
      idProducto: [null],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.maxLength(50)]],
      precio: ['', [Validators.required, Validators.maxLength(100)]],
      stock: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
    this.loadProducto();
  }

  loadProducto(): void {
    this.productoService.getProductos().subscribe({
      next: data => {
        this.productos = data;
        console.log("Datos recibidos:", data); // Inspecciona los datos aquí
      },
      error: error => {
        console.error("Error al obtener productos:", error); // Maneja los errores aquí
      }
    });
  }
}