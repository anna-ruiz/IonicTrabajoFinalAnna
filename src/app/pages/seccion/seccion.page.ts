import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Noticia, Seccion} from "../../common/interfaces";
import {ActivatedRoute, Router, Routes} from "@angular/router";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
})
export class SeccionPage implements OnInit {
  seccion!: string;
  noticias!: Noticia[];
  secciones: Seccion[] = [];
  noticiasAux: Noticia[] = [];
  seccionSeleccionada!: Seccion;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.cargarSecciones();

    this.activatedRoute.paramMap.subscribe(params => {
      const secciontitulo = params.get('seccion');
      if (secciontitulo){
        this.seccion = secciontitulo;
        this.cargarNoticias();
      }
    });
  }



  private cargarNoticias() {
    this.dataService.getNoticiasBySeccion(this.seccion).subscribe(
      {
        next: (data) => {
          this.noticias = data;
          console.log(this.noticias);
          this.cargarDatos();
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          console.log('Completado')
        }
      }
    )

  }
  private cargarSecciones() {

    this.secciones = [];

    this.dataService.getSecciones().subscribe(
      data => {
        this.secciones = data;
        console.log('secciones', this.secciones)
      }
    )
  }
  irADetalle(id: string) {
    this.route.navigate(['/detalle-noticia/',id]);
  }

  cargarDatos(event?: InfiniteScrollCustomEvent) {
    console.log('Cargando más noticias...');
    setTimeout(() => {
      const newNoticias = this.noticias.splice(0,5);
      if (newNoticias.length > 0){
        this.noticiasAux.push(...newNoticias);
      }else {
        if (event){
          event.target.disabled = true;
        }
      }

      if (event){
        event.target.complete();
      }
    }, 1000);
  }

  setSeccionElegida(sec: Seccion) {
    this.seccionSeleccionada = sec;

  }
}
