import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../movies/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css',
})
export class AddMovie {

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

  //Estrellas rate
  stars: number[] = [1, 2, 3, 4, 5];

  private _moviesService = inject(MoviesService);

  addMovie() {

    //Validación campos obligatorios
    if (!this.newMovie.title || !this.newMovie.rate) {
      alert('Title and rate are required');
      return;
    }

    //Añade película y reinicia formulario
    this._moviesService.addMovie(this.newMovie);

    this.newMovie = {
      title: '',
      duration: 0,
      mood: '',
      description: '',
      posterUrl: '',
      rate: 0,
      seen: false,
    };
  }
}
