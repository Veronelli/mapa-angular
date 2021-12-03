import { Component, OnInit } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent {
  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'Fullscreen'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom-range'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores'
    }

  ]

}
