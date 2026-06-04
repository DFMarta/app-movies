import { Routes } from '@angular/router';
import { Movies } from './pages/movies/movies';
import { MoviesDetails } from './pages/movie-details/movie-details';
import { AddMovie } from './pages/add-movie/add-movie';

export const routes: Routes = [
    {path: '', component: Movies },
    {path: 'movies', component: Movies },
    {path: 'movie/:id', component: MoviesDetails },
    {path: 'add', component: AddMovie },
    {path: '**', redirectTo: '', component: Movies },
    
];
