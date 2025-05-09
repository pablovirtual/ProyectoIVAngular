import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FaqComponent } from './components/faq/faq.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
