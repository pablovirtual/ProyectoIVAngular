import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Laravel App';
  currentYear: number = new Date().getFullYear();
  isLoggedIn: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    // Check authentication status on initialization
    this.checkAuthStatus();

    // Subscribe to authentication changes
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Subscribe to loading service changes
    this.loadingService.loading$.subscribe(isLoading => {
      this.loading = isLoading;
    });

    // Subscribe to router events to handle page changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  checkAuthStatus(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
