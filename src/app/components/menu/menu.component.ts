import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Seccion} from "../../common/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  secciones: Seccion[] = [];

  constructor(private dataService: DataService, private route: Router) { }

  ngOnInit() {
    this.cargarSecciones();
  }

  private cargarSecciones() {
    this.dataService.getSeccionesMenu().subscribe(
      data => {
        this.secciones = data;
      }
    )
  }


}
