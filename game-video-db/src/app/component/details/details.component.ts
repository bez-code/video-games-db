import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { APIResponse, Game } from 'src/app/models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  gameRating = 0;
  gameId: string;
  game!: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private HttpService: HttpService,
  ) {
    this.gameId = '';
    this.routeSub = new Subscription;
    this.gameSub = new Subscription;
  }

  ngOnInit() {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: string): void {
    this.gameSub = this.HttpService.getGameList(id)
      .subscribe((response: APIResponse<Game>) => {
        this.game = response.data;
        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      })
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return 'f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
