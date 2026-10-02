import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { Producto } from '../../Models/Producto';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private productService = inject(ProductService);
  private ChangeRefresh = inject(ChangeDetectorRef)
  private navigator = inject(Router)
  public productos: Producto[] = []
  public busqueda = ''
  public productoSeleccionado: Producto | null = null

  get productosFiltrados() {
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.GetData()
  }

  Buscar(event: Event) {
    this.busqueda = (event.target as HTMLInputElement).value;
  }

  FormatoPrecio(valor: number) {
    return '$ ' + valor.toLocaleString('es-CO', { maximumFractionDigits: 0 });
  }

  VerProducto(item: Producto) {
    this.productoSeleccionado = item;
  }

  CerrarModal() {
    this.productoSeleccionado = null;
  }

  GoToCreateProduct() {
    this.navigator.navigate(['/create-products']);
  }

  GetData() {
    this.productService.GetProducts().subscribe({
      next: (data) => {
        this.productos = data
        this.ChangeRefresh.markForCheck()
      }, error(err) {
        console.error('Error:', err)
      }
    })
  }

  DeleteProduct(id: number) {
    this.productService.DeleteProduct(id).subscribe({
      next: (response) => {
        this.productos = this.productos.filter(item => item.id !== id);
        this.ChangeRefresh.markForCheck();
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
}