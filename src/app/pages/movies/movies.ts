import { Component, inject, computed, signal } from '@angular/core';
import { Movie } from './movie.model';
import { MoviesService } from '../../services/movies-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {

  //Objeto para almacenar nueva película
  newMovie: Movie = {
    title: '',
    duration: 0,
    mood: '',
    description: '',
    posterUrl: '',
    rate: 0,
    seen: false,
  };

  //Signal para rellenar rate
  stars = signal([1, 2, 3, 4, 5]);

  private _moviesService = inject(MoviesService);

  //Películas locales
  movies = this._moviesService.movies;

  //Procesa las películas según filtro en tiempo real
  filteredMovies = computed(() => {
    const search = this._moviesService.searchString();
    return search
      ? this.movies().filter((m) => m.title.toLowerCase().includes(search))
      : this.movies();
  });

  //Añade película y actualiza señal
  addMovie() {
    this._moviesService.addMovie(this.newMovie);
    this.movies.set(this._moviesService.getMovies());
  }

  //Elimina película y actualiza señal
  deleteMovie(index: number) {
    this._moviesService.deleteMovie(index);
    this.movies.set(this._moviesService.getMovies());
  }
}
