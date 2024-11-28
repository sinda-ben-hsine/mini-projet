import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { AddFilmComponent } from './add-film/add-film.component';
import { UpdateFilmComponent } from './update-film/update-film.component';
import { LoginComponent } from './login/login.component';
import { filmGuard } from './film.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: "films", component: FilmsComponent },
  { path: "add-film", component: AddFilmComponent , canActivate:[filmGuard]},
  { path: "updateFilm/:id", component: UpdateFilmComponent },
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  { path: "", redirectTo: "films", pathMatch: "full" } 
   // Correction ici
];

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
