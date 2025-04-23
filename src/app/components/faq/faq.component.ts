import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Faq } from '../../models/faq.model';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadFaqs();
  }

  loadFaqs(): void {
    this.loading = true;
    this.apiService.getFaqs().subscribe(
      (data) => {
        if (data && data.length > 0) {
          // Añadir la propiedad collapsed para manejo del UI
          this.faqs = data.map(faq => ({
            ...faq,
            collapsed: true
          }));
        } else {
          console.warn('API returned empty data, using default FAQs');
          this.setDefaultFaqs();
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Error al cargar las preguntas frecuentes. Por favor, intente más tarde.';
        console.error('Error loading FAQs:', error);
        
        // En caso de error, usar FAQs por defecto
        this.setDefaultFaqs();
        this.loading = false;
      }
    );
  }
  
  // Método para establecer FAQs por defecto en caso de que la API falle
  private setDefaultFaqs(): void {
    this.faqs = [
      {
        id: 1,
        question: '¿Qué servicios ofrece la empresa?',
        answer: 'Ofrecemos servicios de desarrollo web, móvil, consultoría tecnológica y soluciones de software a medida para empresas de todos los tamaños.',
        collapsed: true
      },
      {
        id: 2,
        question: '¿Cómo puedo contactar al soporte técnico?',
        answer: 'Puede contactar a nuestro equipo de soporte técnico a través del correo soporte@empresa.com o llamando al +52 55 1234 5678 en horario de lunes a viernes de 9:00 a 18:00.',
        collapsed: true
      },
      {
        id: 3,
        question: '¿Cuáles son los métodos de pago aceptados?',
        answer: 'Aceptamos pagos con tarjetas de crédito/débito, transferencias bancarias, PayPal y depósitos en efectivo.',
        collapsed: true
      },
      {
        id: 4,
        question: '¿Ofrecen garantía por sus servicios?',
        answer: 'Sí, todos nuestros servicios cuentan con garantía de satisfacción. Si no está conforme con el resultado, trabajaremos hasta que cumpla con sus expectativas dentro de los términos acordados en el contrato.',
        collapsed: true
      }
    ];
  }
  
  // Method to toggle the collapse state
  toggleCollapse(faq: Faq): void {
    faq.collapsed = !faq.collapsed;
  }
}
