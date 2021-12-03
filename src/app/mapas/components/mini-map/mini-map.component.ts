import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [
    `
    div{
      width:100%;
      height:150px;
      margin:0px;
    }
    `
  ]
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat: [number, number] = [0, 0];
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapBox;

    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 14
    })

    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(mapa);

  }


}
