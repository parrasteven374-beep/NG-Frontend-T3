import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Producto } from '../Models/Producto';

@Service()
export class ProductService {
    private httpclient = inject(HttpClient)
    private baseUrl: string = environment.apiUrl
    /*metodo get*/
    GetProducts() {
        return this.httpclient.get<Producto[]>(this.baseUrl + 'producto');
    }



    CreateProducto(item: Producto) {
        return this.httpclient.post(this.baseUrl + 'producto', item, { responseType: 'text' })
    }

    DeleteProduct(id: number) {
        return this.httpclient.delete(this.baseUrl + 'producto/' + id, { responseType: 'text' });
    }
}
