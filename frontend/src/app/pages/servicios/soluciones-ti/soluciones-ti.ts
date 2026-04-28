import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-soluciones-ti',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './soluciones-ti.html',
  styleUrls: ['./soluciones-ti.scss'],
})
export class SolucionesTi {

  constructor(private router: Router) {}

  irConsultoria() {
    this.router.navigate(['/servicios/consultoria']);
  }

  irChat() {
    this.router.navigate(['/chat']);
  }
}