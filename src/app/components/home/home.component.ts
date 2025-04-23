import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  error: string = '';
  content: any = {};

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadHomeContent();
  }

  loadHomeContent(): void {
    this.loading = true;
    this.apiService.getHomeContent().subscribe(
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
        this.error = 'Error al cargar el contenido. Por favor, intente nuevamente más tarde.';
        console.error('Error loading home content:', error);
        
        // En caso de error, también usamos contenido por defecto
        this.setDefaultContent();
        this.loading = false;
      }
    );
  }
  
  // Método para establecer contenido por defecto en caso de que la API falle
  private setDefaultContent(): void {
    this.content = {
      title: 'Bienvenido a nuestra aplicación',
      subtitle: 'Una potente solución para todas tus necesidades',
      features: [
        {
          title: 'Fácil de usar',
          description: 'Interfaz intuitiva que facilita la navegación y operación',
          icon: 'fas fa-user-friendly'
        },
        {
          title: 'Rápida y eficiente',
          description: 'Optimizada para ofrecer el mejor rendimiento',
          icon: 'fas fa-bolt'
        },
        {
          title: 'Segura',
          description: 'Protección avanzada para tus datos y privacidad',
          icon: 'fas fa-shield-alt'
        }
      ]
    };
  }
}
