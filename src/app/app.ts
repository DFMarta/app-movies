import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MoviesService } from './services/movies-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  //Título aplicación
  protected readonly title = signal('landingPageAngular');

  //Signal search
  searchString = signal('');

  private _moviesService = inject(MoviesService);

  //Observa cambios en searchString y convierte a minúsculas
  constructor() {
    effect(() => {
      this._moviesService.setSearch(this.searchString().toLowerCase());
    });
  }

  //Resetea search y limpia campo de búsqueda
  resetFilters() {
    this.searchString.set('');
    this._moviesService.setViewFilter('none');
    this._moviesService.clearSearch();
  }

  get activeFilter() {
    return this._moviesService.viewFilter();
  }

  isActive(filter: 'seen' | 'unseen') {
    return this.activeFilter === filter;
  }

  setFilter(value: 'seen' | 'unseen') {
    const current = this._moviesService.viewFilter();

    if (current === value) {
      this._moviesService.setViewFilter('none');
    } else {
      this._moviesService.setViewFilter(value);
    }
  }
  
}
