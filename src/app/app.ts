import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MoviesService } from './services/movies-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, FormsModule],
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
  resetSearch() {
    this.searchString.set('');
    this._moviesService.clearSearch();
  }
}
