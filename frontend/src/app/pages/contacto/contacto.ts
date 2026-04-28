import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.scss']
})
export class Contacto {

  nombre: string = '';
  email: string = '';
  asunto: string = '';
  mensaje: string = '';
  enviar() {
    console.log(this.nombre, this.email, this.mensaje, this.asunto);
    alert('Mensaje enviado');
    var nomrbedb = this.nombre
    var emaildb = this.nombre
    var mensajedb = this.nombre
    var asuntodb = this.nombre
    this.nombre = ""
    this.email = ""
    this.mensaje = ""
    this.asunto = ""
  }
}