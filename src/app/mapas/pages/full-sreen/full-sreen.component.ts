import { Component, OnInit } from '@angular/core';

import * as mapboxgl from 'mapbox-gl'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-full-sreen',
  templateUrl: './full-sreen.component.html',
  styles: [
  ]
})
export class FullSreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapBox;
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [8.741827266842936, 45.252133039539814],
      zoom: 14
    });
  }

}
