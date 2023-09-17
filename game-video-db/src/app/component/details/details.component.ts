import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { APIResponse, Game } from 'src/app/models';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  template: `
    <mwl-gauge
    class="two"
            [max]="100"
            [dialStartAngle]="180"
            [dialEndAngle]="0"
            [value]="gameRating"
            [animated]="true"
            [color]="getColor"
            [animationDuration]="2"
    >
    </mwl-gauge>
  `,
})

export class DetailsComponent implements OnInit {
  gameRating = 0;
  gameId: string;
  game: Game;
  routeSub: Subscription;
  gameSub: Subscription;

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private HttpService: HttpService,
  ) {
    this.gameId = '';
    this.routeSub = new Subscription;
    this.gameSub = new Subscription;
    this.game = {} as Game;
  }

  ngOnInit() {
    this.routeSub = this.ActivatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }

  getGameDetails(id: string): void {
    this.gameSub = this.HttpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;

        setTimeout(() => {
          this.gameRating = this.game.metacritic;
        }, 1000);
      });
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
