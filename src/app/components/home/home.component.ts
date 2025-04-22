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
        this.content = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load home content. Please try again later.';
        this.loading = false;
        console.error('Error loading home content:', error);
      }
    );
  }
}
