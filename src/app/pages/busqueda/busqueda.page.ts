import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Noticia} from "../../common/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {
  textoBuscar = '';
  noticias: Noticia[] = [];

  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.cargarBusqueda();
  }

  buscar(event:any){
    this.textoBuscar = event.detail.value;
    this.cargarBusqueda();
  }

  cargarBusqueda(){
    this.dataService.getNoticiaBusqueda(this.textoBuscar).subscribe(
      notis => {
        this.noticias = notis;
      }
    );
  }

  abrirDetalles(idNoticia: string) {
    this.route.navigate(['/detalle-noticia/',idNoticia]);
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
