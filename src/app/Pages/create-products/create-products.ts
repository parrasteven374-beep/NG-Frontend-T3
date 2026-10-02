import { Component, inject } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { Router } from '@angular/router';
import { Producto } from '../../Models/Producto';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-create-products',
  styleUrl: './create-products.css',
  templateUrl: './create-products.html',
})
export class CreateProducts {
  private productServices = inject(ProductService);
  private navigator = inject(Router);

  public newproduct: Producto = { id: 0, nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '' };

  // Esta función lee el archivo que subas y lo convierte a texto Base64
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Guarda el resultado (Base64) en tu modelo
        this.newproduct.imagenUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  RegisterProduct() {
    this.productServices.CreateProducto(this.newproduct).subscribe({
      next: (response) => {
        this.navigator.navigate(['/']);
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}