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
        this.faqs = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load FAQ content. Please try again later.';
        this.loading = false;
        console.error('Error loading FAQs:', error);
      }
    );
  }
  
  // Method to toggle the collapse state
  toggleCollapse(faq: Faq): void {
    faq.collapsed = !faq.collapsed;
  }
}
