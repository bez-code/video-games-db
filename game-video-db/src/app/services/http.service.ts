import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment as env} from 'src/environments/environment.prod'
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
    let params = new HttpParams().set('ordeing', ordering);
    if (search) {
      params: new HttpParams().set('ordeing', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.Base_URL}/games`, {
      params: params,
    })
  }

}
