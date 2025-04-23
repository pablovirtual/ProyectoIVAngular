import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor() {}

  /**
   * Establece el estado de carga
   * @param isLoading Estado que indica si hay una solicitud en curso
   */
  setLoading(isLoading: boolean): void {
    this.loadingSubject.next(isLoading);
  }

  /**
   * Obtiene el estado actual de carga
   * @returns El estado de carga actual como valor booleano
   */
  getLoadingValue(): boolean {
    return this.loadingSubject.value;
  }
}