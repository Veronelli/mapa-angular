import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [8.741827266842936, 45.252133039539814]

  constructor() { }

  ngOnDestroy(): void {
    this.map.off('zoom', () => { });
    this.map.off('move', () => { });
    this.map.off('zoom', () => { });
  }

  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = environment.mapBox;

    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: 14
    })
    this.map.on('zoom', (event) => {
      this.zoomLevel = this.map.getZoom()
    })
    this.map.on('zoom', (event) => {
      if (this.map.getZoom() > 18) {
        this.map.zoomTo(18)
      }
    })
    this.map.on("move", (event) => {
      const { lng, lat } = this.map.getCenter()
      this.center = [lng, lat]
    })
  }

  zoomIn() {
    this.map.zoomIn();
  }

  zoomOut() {
    this.map.zoomOut();
  }

  zoomCambio(valor: string) {
    this.map.zoomTo(Number(valor));
  }


}
