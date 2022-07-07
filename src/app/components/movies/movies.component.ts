import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinct, filter, fromEvent, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Movie } from 'src/app/interfaces/movies';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput!: ElementRef ;
  movies$!: Observable<Movie[]>


  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.movies$ = fromEvent<Event>(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: Event)=>{
        const searchTerm = (event.target as HTMLInputElement).value;
        return searchTerm
      }),
      filter((searchTerm: string)=> searchTerm.length > 3 ),
      debounceTime(500),
      distinct(),
      switchMap((searchTerm: string) => this.movieService.getMovies(searchTerm) ),
    )
  }
}