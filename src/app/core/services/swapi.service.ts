import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SwapiService {

  private baseUrl = environment.API_BASE_URL;

  constructor(
    private http: HttpClient
  ) { }

  getResource(endpoint: string) {
    const requestUrl = `${this.baseUrl}/${endpoint}`;
    return this.http.get(requestUrl)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(err: any) {
    return err instanceof HttpErrorResponse ? err.error : err;
  }

  getFilms() {
    return this.getResource('films')
      .pipe(
        map((response: any) => response.results),
      );
  }

  getFilm(id: number) {
    return this.getResource(`films/${id}`);
  }
}
