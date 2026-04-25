import { Routes } from '@angular/router';
import { Servicios} from './pages/servicios/servicios';
import { Saas } from './pages/servicios/saas/saas';
import { Hardware } from './pages/servicios/hardware/hardware';
import { Software } from './pages/servicios/software/software';
import { Consultoria } from './pages/servicios/consultoria/consultoria';
import { SolucionesTi } from './pages/servicios/soluciones-ti/soluciones-ti';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {path:'', component: Home},
  {path: "servicios",
    component: Servicios,
    children: [
      { path: 'saas', component: Saas},
      { path: 'hardware', component: Hardware},
      { path: 'software', component: Software},
      { path: 'consultoria', component: Consultoria},
      { path: 'soluciones-ti', component: SolucionesTi},
    ]
  }
];
