import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  currentSlide = 0;

  slides = [
    {
      badge: 'INNOVACIÓN EN TECNOLOGÍA',
      title: 'Soluciones TI que Transforman para tu empresa',
      image: 'carousel.jpg'
    },
    {
      badge: 'NUESTRO EQUIPO',
      title: 'Profesionales altamente capacitados en tecnología y consultoría',
      image: 'carousel.jpg'
    },
    {
      badge: 'CLIENTES SATISFECHOS',
      title: 'Opiniones positivas y casos de éxito en implementación de TI',
      image: 'carousel.jpg'
    }
  ];

  setSlide(index: number) {
    this.currentSlide = index;
  }

  currentServiceSlide = 0;

  innovativeServices = [
    {
      title: 'Soluciones TI',
      desc: 'Transformamos tu trabajo con soluciones de TI.',
      img: 'imagen.jpg'
    },
    {
      title: 'SAAS',
      desc: 'Gestiona todo, así puedes centrarte en tu negocio.',
      img: 'imagen.jpg'
    },
    {
      title: 'Hardware',
      desc: 'Ofrecemos hardware avanzado para un rendimiento óptimo.',
      img: 'imagen.jpg'
    },
    {
      title: 'Ciberseguridad',
      desc: 'Protegemos tu infraestructura contra amenazas.',
      img: 'imagen.jpg'
    }
  ];

  setServiceSlide(index: number) {
    this.currentServiceSlide = index;
  }
  currentTestimonialSlide = 0;

  testimonials = [
    {
      text: 'Un equipo profesional como la empresa MIS que entiende nuestras necesidades y resuelve problemas rápidamente.',
      client: 'IEI Nº 449 San Luis – Cañete',
      logo: 'sanluis.jpg'
    },
    {
      text: 'Matt Innova Solution mejoró nuestra infraestructura TI y ofrece un soporte excepcional. ¡Recomendados!',
      client: 'IESTP TECNOCOM',
      logo: 'tecnocom.jpg'
    },
    {
      text: 'La implementación del ERP y otras soluciones de Matt Innova Solution optimizó nuestros procesos y aumentó la eficiencia.',
      client: 'IESTP WORLDNET',
      logo: 'worldnet.jpg'
    }
  ];

  setTestimonialSlide(index: number) {
    this.currentTestimonialSlide = index;
  }
}
