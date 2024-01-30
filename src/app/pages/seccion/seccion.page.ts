import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Noticia, Seccion} from "../../common/interfaces";
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.page.html',
  styleUrls: ['./seccion.page.scss'],
})
export class SeccionPage implements OnInit {
  seccion!: string;
  noticias!: Noticia[];
  secciones: Seccion[] = [];

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

  cargarDatos(event: any) {
    console.log('Cargando más noticias...');
    setTimeout(() => {
      const nuevasNotis = Array(5);
      this.noticias.push(...nuevasNotis);
      event.target.complete();
    }, 1000);
  }
}
