import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search/:game-search', component: HomeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
