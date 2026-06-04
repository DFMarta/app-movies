import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../movies/movie.model';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movies-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MoviesDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  stars = [1, 2, 3, 4, 5];

  movie = signal<Movie | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    const movie = this.moviesService.getMovies().find((m) => m.id === id);

    if (!movie) {
      this.movie.set(null);
      return;
    }

    this.movie.set(movie);
  }
}
