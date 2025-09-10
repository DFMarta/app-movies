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
  deleteMovie(index: number) {
    const movies = this.getMovies();
    movies.splice(index, 1);
    localStorage.setItem(this.localStorageKey, JSON.stringify(movies));
  }

  // Actualiza signal del string de search
  setSearch(string: string) {
    this.searchString.set(string);
  }

  //Limpia campo search
  clearSearch() {
    this.searchString.set('');
  }
}
