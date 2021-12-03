import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullSreenComponent } from './pages/full-sreen/full-sreen.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';

const routes: Routes = [
  {
    path: '',
    children: [{
      path: 'fullscreen', component: FullSreenComponent
    },
    {
      path: 'zoom-range', component: ZoomRangeComponent
    },
    {
      path: 'marcadores', component: MarcadoresComponent
    },
    {
      path: 'propiedades', component: PropiedadesComponent
    },
    {
      path: '**', component: FullSreenComponent
    },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
