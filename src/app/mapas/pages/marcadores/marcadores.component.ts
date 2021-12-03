import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./style.css']
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [8.741827266842936, 45.252133039539814]
  marks: MarcadorColor[] = []

  constructor() { }
  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapBox;

    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 14
    })
    // const markerHtml: HTMLElement = document.createElement('div')
    // markerHtml.innerHTML = "Hello World"
    // const maker = new mapboxgl.Marker(/*{ element: markerHtml }*/)
    //   .setLngLat(this.center)
    //   .addTo(this.map)
    // this.marks.push(maker)
    this.leerLocalStorage()
  }

  agregarMarcador() {
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16))

    const mark = new mapboxgl.Marker({
      color,
      draggable: true
    }).setLngLat(this.map.getCenter()).addTo(this.map)
    this.marks.push({
      color,
      marker: mark
    });

    mark.on("dragend", () => {
      this.guardarMarcadoresLocalStorage()
    })
    this.guardarMarcadoresLocalStorage();
  }
  buscarMarca(i: number) {
    this.map.flyTo({
      center: this.marks[i].marker?.getLngLat()
    })
    // this.map.setCenter(this.marks[i].marker.getLngLat())
  }

  guardarMarcadoresLocalStorage() {
    const lngLatArr: MarcadorColor[] = [];
    this.marks.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color,
        center: [lng, lat]
      })
      localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
    })
  }

  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) return;
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m => {
      const newMarcador = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      }).setLngLat(m.center!).addTo(this.map)
      this.marks.push({
        marker: newMarcador,
        color: m.color
      })

      newMarcador.on("dragend", () => {
        this.guardarMarcadoresLocalStorage()
      })
    })

  }

  borrarMarcador(i: number) {
    this.marks[i].marker?.remove();
    this.marks.splice(i, 1)
    this.guardarMarcadoresLocalStorage()
  }
}
