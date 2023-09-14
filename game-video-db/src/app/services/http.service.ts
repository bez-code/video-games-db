import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment as env } from 'src/environments/environment.prod'
import { APIResponse, Game } from '../models';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params: new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.Base_URL}/games`, {
      params: params,
    })
  }
  getGameDetails(id: string): Observable<Game> {
    const getInfoRequest = this.http.get(`${env.Base_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(`${env.Base_URL}/games/${id}/movies`);
    const gameScreenshotsRequest = this.http.get(`${env.Base_URL}/games/${id}/screenshots`)
    return forkJoin({
      getInfoRequest,
      gameTrailersRequest,
      gameScreenshotsRequest,
    }).pipe(
      map((resp:any) =>{
        return {
          ...resp['getInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        }
      })
    )
  }
}
