import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesApi } from '../../services/movies-api';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movies/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MoviesDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(MoviesApi);

  stars = [1, 2, 3, 4, 5];

  movie = signal<Movie | null>(null);

  ngOnInit(): void {
    const title = this.route.snapshot.paramMap.get('title');
    if (!title) return;

    // Película local
    const localMovies: Movie[] = JSON.parse(localStorage.getItem('movies') || '[]');
    const localMovie = localMovies.find((m) => m.title === title);
    if (!localMovie) {
      this.movie.set(null);
      return;
    }

    // Inicializamos con los datos locales
    const combinedMovie: Movie = { ...localMovie };

    // Buscamos en TMDb y solo actualizamos poster y descripción si existen
    this.apiService.searchMovie(title).subscribe((res) => {
      if (res?.results?.length) {
        const tmdb = res.results[0];
        if (tmdb.id) {
          this.apiService.getMovieDetails(tmdb.id).subscribe((details) => {
            if (details.runtime) combinedMovie.duration = details.runtime;
            if (tmdb.poster_path)
              combinedMovie.posterUrl = `https://image.tmdb.org/t/p/w300${tmdb.poster_path}`;
            if (tmdb.overview) combinedMovie.description = tmdb.overview;
            this.movie.set(combinedMovie);
          });
        }
      } else {
        // No se encontró en TMDb, solo datos locales
        this.movie.set(combinedMovie);
      }
    });
  }
}
