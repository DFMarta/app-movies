import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../movies/movie.model';
import { CommonModule } from '@angular/common';
import { MoviesApi } from '../../services/movies-api';
import { Subject, debounceTime } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.css',
})
export class AddMovie implements OnInit {
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.apiService.searchMovie(value).subscribe((res) => {
        this.searchResults = res.results ?? [];
      });
    });
  }

  private apiService = inject(MoviesApi);
  private _moviesService = inject(MoviesService);
  private searchSubject = new Subject<string>();
  private router = inject(Router);

  searchResults: any[] = [];
  searchText = '';

  //Objeto para almacenar nueva película
  newMovie: Movie = {
    id: '',
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

  searchMovie() {
    const title = this.searchText.trim();

    if (title.length < 3) {
      this.searchResults = [];
      return;
    }

    this.searchSubject.next(title);
  }

  selectMovie(movie: any) {
    this.newMovie.title = movie.title;
    this.newMovie.posterUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : '';
    this.newMovie.description = movie.overview;

    this.apiService.getMovieDetails(movie.id).subscribe((details) => {
      this.newMovie.duration = details.runtime ?? 0;
    });

    this.searchResults = [];
    this.searchText = movie.title;
  }

  addMovie() {
    if (!this.newMovie.title || !this.newMovie.rate) {
      alert('Title and rate are required');
      return;
    }

    const movieToSave: Movie = {
      ...this.newMovie,
      id: crypto.randomUUID(),
    };

    this._moviesService.addMovie(movieToSave);

    this.newMovie = {
      id: '',
      title: '',
      duration: 0,
      mood: '',
      description: '',
      posterUrl: '',
      rate: 0,
      seen: false,
    };

    this.searchResults = [];

    this.router.navigate(['/movies']);
  }
}
