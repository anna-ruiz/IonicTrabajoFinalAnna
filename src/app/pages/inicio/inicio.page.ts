import { Component, OnInit } from '@angular/core';
import {Noticia} from "../../common/interfaces";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {InfiniteScrollCustomEvent, LoadingController} from "@ionic/angular";
import {car} from "ionicons/icons";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  noticias: Noticia[] = [];
  noticiasAux: Noticia[] = [];
  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.cargarNoticias();
  }

  private cargarNoticias() {
    this.dataService.getNoticias().subscribe(
      {
        next: (data) => {
          this.noticias = data;
       this.noticias = data.sort((a,b) => {
            const fecha1 = new Date(a.fecha).getTime();
            const fecha2 = new Date(b.fecha).getTime();
            return fecha2 - fecha1;
          });
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


  irABusqueda() {
    this.route.navigate(['/busqueda']);
  }

  abrirDetalles(noticia: string) {
    this.route.navigate(['/detalle-noticia/',noticia]);
  }



 cargarDatos(event?: InfiniteScrollCustomEvent) {
   // console.log('Cargando más noticias...');
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
}
