import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Producto } from '../models/producto.model'; // Importa la interfaz

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://127.0.0.1:8000/api/productos';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener productos', error);
        return of([]); // Devuelve un arreglo vacío en caso de error
      })
    );
  }

  addProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto).pipe(
      catchError((error) => {
        console.error('Error al agregar producto', error);
        return of(null);
      })
    );
  }
  
}