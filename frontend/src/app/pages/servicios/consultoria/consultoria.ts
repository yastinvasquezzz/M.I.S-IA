import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consultoria',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './consultoria.html',
  styleUrls: ['./consultoria.scss'],
})
export class Consultoria {

  constructor(private router: Router) {}

  irChat() {
    this.router.navigate(['/chat']);
  }
}