import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesApi {
  // URL base de la API de TMDb y clave de acceso
  private URL = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  // Busca películas en TMDb por título
  // Devuelve un Observable con los resultados
  searchMovie(title: string): Observable<any> {
    return this.http.get(`${this.URL}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: title,
      },
    });
  }

  // Recupera los detalles completos de una película por su ID
  // Devuelve un Observable con la información de la película
  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.URL}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        language: 'en-US',
      },
    });
  }
}
