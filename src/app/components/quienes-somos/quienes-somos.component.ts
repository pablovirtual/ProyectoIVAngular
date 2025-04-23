import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.css']
})
export class QuienesSomosComponent implements OnInit {
  loading: boolean = true;
  error: string = '';
  content: any = {
    vision: '',
    mision: '',
    politicas: [],
    ubicacion: {
      direccion: '',
      ciudad: '',
      pais: '',
      telefono: '',
      email: '',
      coordenadas: {
        lat: 0,
        lng: 0
      }
    }
  };

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadQuienesSomosContent();
  }

  loadQuienesSomosContent(): void {
    this.loading = true;
    
    // Intento cargar la información desde la API
    this.apiService.getQuienesSomosContent().subscribe(
      (data) => {
        if (data && Object.keys(data).length > 0) {
          // Si recibimos datos válidos de la API, los usamos
          this.content = data;
        } else {
          // Si la API devuelve un objeto vacío o no válido, usamos contenido por defecto
          console.warn('API returned empty data, using default content');
          this.setDefaultContent();
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar la información. Por favor, intente nuevamente más tarde.';
        console.error('Error fetching quienes-somos content:', error);
        
        // En caso de error, también usamos contenido por defecto
        this.setDefaultContent();
        this.loading = false;
      }
    );
  }
  
  // Método para establecer contenido por defecto en caso de que la API falle
  private setDefaultContent(): void {
    this.content = {
      vision: 'Ser la empresa líder en soluciones tecnológicas innovadoras que transformen la manera en que las personas interactúan con la tecnología, contribuyendo al desarrollo sostenible de la sociedad.',
      mision: 'Proporcionar soluciones tecnológicas de alta calidad que satisfagan las necesidades de nuestros clientes, promoviendo la innovación, la excelencia y el desarrollo profesional de nuestro equipo.',
      politicas: [
        'Compromiso con la calidad en todos nuestros productos y servicios',
        'Mejora continua de procesos y tecnologías',
        'Responsabilidad social y ambiental en todas nuestras operaciones',
        'Transparencia y ética en nuestras relaciones comerciales',
        'Fomento de la innovación y creatividad'
      ],
      ubicacion: {
        direccion: 'Calle Principal 123, Edificio Tecnológico, Piso 5',
        ciudad: 'Ciudad de México',
        pais: 'México',
        telefono: '+52 55 1234 5678',
        email: 'contacto@empresa.com',
        coordenadas: {
          lat: 19.432608,
          lng: -99.133209
        }
      }
    };
  }
}