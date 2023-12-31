import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { DetailsComponent } from './component/details/details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:game-search', component: HomeComponent},
  {path: 'details/:id', component: DetailsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
