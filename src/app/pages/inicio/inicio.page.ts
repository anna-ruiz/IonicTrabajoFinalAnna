import { Component, OnInit } from '@angular/core';
import {Noticia} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  noticias: Noticia[] = [];
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  private cargarNoticias() {
    this.dataService.getNoticias().subscribe(
      {
        next: (data) => {
          this.noticias = data;
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

  irABusqueda() {
    this.route.navigate(['/busqueda']);
  }

  abrirDetalles(noticia: string) {
    this.route.navigate(['/detalle-noticia/',noticia]);
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
