import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Comentario, Noticia, Seccion} from "../common/interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  URL_BASE = 'http://localhost:3000/api/noticias';
  constructor(private http: HttpClient) { }

  getSeccionesMenu(): Observable<Seccion[]>{
    return this.http.get<Seccion[]>(this.URL_BASE+'/secciones');
  }

  getNoticias(): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.URL_BASE);
  }

  getNoticia(noticiaId: string): Observable<Noticia>{
    return this.http.get<Noticia>(this.URL_BASE+'/noticia/'+noticiaId);
  }

  getNoticiaBusqueda(busqueda: string): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.URL_BASE+'/byBusqueda/'+busqueda);
  }

 /* getComentarios(noticiaId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.URL_BASE}/comentarios/${noticiaId}`);
  }*/
  // Método para obtener comentarios de una noticia
  getComentarios(noticiaId: string): Observable<Comentario[]> {
    const url = this.URL_BASE+'/'+noticiaId+'/comentarios';
    return this.http.get<Comentario[]>(url);
  }

  // Método para agregar un comentario a una noticia
/*  agregarComentario(noticiaId: string, comentario: Comentario): Observable<any> {
    const url = `${this.URL_BASE}/${noticiaId}/comentar`;
    return this.http.post(url, comentario);
  }*/

  addComent(noticiaId: string, comentarios: Comentario[]): Observable<Noticia>{
    return this.http.patch<Noticia>(this.URL_BASE+'/'+noticiaId, {comentarios:comentarios});
  }

  getNoticiasBySeccion(seccion: string): Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.URL_BASE+'/bySeccion/'+seccion);
  }

  getSecciones() {
    return this.http.get<Seccion[]>(this.URL_BASE+'/secciones')
  }
}
