import { Component } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Noticia} from "../../common/interfaces";
import {Router} from "@angular/router";
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage {
  textoBuscar = '';
  noticias: Noticia[] = [];
  noticiasAux: Noticia[] = [];

  constructor(private dataService: DataService, private route: Router) { }


  buscar(event:any){
    this.textoBuscar = event.detail.value;
    this.cargarBusqueda();
  }

  cargarBusqueda(){
    this.dataService.getNoticiaBusqueda(this.textoBuscar).subscribe(
      notis => {
        this.noticias = notis;
        this.cargarDatos();
      }
    );
  }

  abrirDetalles(idNoticia: string) {
    this.route.navigate(['/detalle-noticia/',idNoticia]);
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
}
