import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { Subscription, subscribeOn } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.routeSub = new Subscription;
    this.gameSub = new Subscription;
    this.sort = '';
    this.games = [];

  }
  ngOnInit(): void {
    this.routeSub = this.activateRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
   
  }
  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

ngOnDestroy(): void {
 if(this.routeSub){
   this.routeSub.unsubscribe();
 }
 if(this.gameSub){
  this.gameSub.unsubscribe()
 }
}
}



