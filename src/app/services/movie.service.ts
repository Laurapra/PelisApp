import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/apiResponse';
import { Movie } from '../interfaces/movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  //Key 461fd515
  private API_URL: string ='http://www.omdbapi.com/?apikey=461fd515';

  constructor(private http: HttpClient) { }

  getMovies(searchTerm: string): Observable<Movie[]>{
    //este es la manera de concatenación
    return this.http.get<ApiResponse>(`${this.API_URL}&s=${searchTerm}`).pipe(
      map(response => {
        return response.Search;
      })
    )
  }
}
