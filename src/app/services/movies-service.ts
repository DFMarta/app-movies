import { Injectable, signal } from '@angular/core';
import { Movie } from '../pages/movies/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  //Key del localStorage
  private localStorageKey = 'movies';

  //Signal películas locales
  movies = signal<Movie[]>(this.getMovies());

  //Signal search
  searchString = signal<string>('');

  //Filtro vistas/no vistas
  viewFilter = signal<'none' | 'seen' | 'unseen'>('none');

  //Guarda lista actual de películas localmente
  saveMovies() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.movies()));
  }

  //Recupera películas locales
  getMovies(): Movie[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  //Añade nuevo objeto y actualiza signal
  addMovie(movie: Movie) {
    this.movies.update((movies) => [...movies, movie]);
    this.saveMovies();
  }

  //Elimina objeto por índice y actualiza localStorage
  deleteMovie(id: string) {
    const movies = this.getMovies().filter((m) => m.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
    this.movies.set(movies);
  }

  //Actualiza signal del string de search
  setSearch(string: string) {
    this.searchString.set(string);
  }

  //Limpia campo search
  clearSearch() {
    this.searchString.set('');
  }
  setViewFilter(value: 'seen' | 'unseen' | 'none') {
    this.viewFilter.set(value);
  }
}
