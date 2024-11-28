import { Injectable } from '@angular/core';
import { Films } from '../model/Film.model';
import { Observable } from 'rxjs';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Genre } from '../model/genre.model';
import { apiURL } from '../config';
import { genreWrapper } from '../model/genreWrapped.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};




@Injectable({
  providedIn: 'root'
})
export class FilmService {
  apiURLgen: string = 'http://localhost:8090/films/gen';
  


  films: Films[] =[]; // Liste des films
  //genres : Genre[];

  constructor(private http : HttpClient) {
   /*  this.genres=[
      {idGen : 1, nomGen : "Action"},
      {idGen : 2, nomGen : "Romantique"}
    ]; */
    //console.log("Création du service Film !");
    // Initialisation de la liste des films avec des exemples
   /*  this.films = [
      { idFilm: 1, nomFilm: "Harry Potter", dureeFilm: 159, dateSortir: new Date("2001-01-16") ,
      genre:  {idGen : 1, nomGen : "Action"} },
      { idFilm: 2, nomFilm: "Sous la seine", dureeFilm: 101, dateSortir: new Date("2024-06-05") ,
    genre :  {idGen : 2, nomGen : "Romantique"} },
      { idFilm: 3, nomFilm: "En plein vol", dureeFilm: 107, dateSortir: new Date("2024-01-12"), 
    genre:  {idGen : 1, nomGen : "Action"} }
    ]; */
  }

  // Retourne la liste des films
  listeFilms(): Observable<Films[]>{
    return this.http.get<Films[]>(apiURL);
    }
  // Ajoute un nouveau film à la liste
 // Dans FilmService
/* ajouterFilm(film: Films): number {
  film.idFilm = this.films.length + 1; // Attribuer un nouvel ID (ajuste selon ta logique)
  this.films.push(film);
  this.trierFilms(); // Trie après ajout
  return film.idFilm; // Retourne l'ID du film ajouté
}
 */
ajouterFilm( film: Films):Observable<Films>{
  return this.http.post<Films>(apiURL, film, httpOptions);
  }

  // Supprime un film de la liste
 /*  supprimerFilm(film: Films) {
    const index = this.films.indexOf(film, 0);
    if (index > -1) {
      this.films.splice(index, 1);
    }
  } */

  supprimerFilm(id : number) {
    const url = `${apiURL}/${id}`;
    return this.http.delete(url, httpOptions);
    }

  // Retourne un film par son ID
 /*  consulterFilm(id: number): Films | undefined {
    return this.films.find(film => film.idFilm === id);
  } */

  consulterFilm(id: number): Observable<Films> {
    const url = `${apiURL}/${id}`;
    return this.http.get<Films>(url);
    }

  // Trie la liste des films par leur ID
  // Trie la liste des films par leur ID
trierFilms() {
  this.films = this.films.sort((n1, n2) => {
    if (n1.idFilm != null && n2.idFilm != null) { // Vérifie si les idFilm ne sont pas null ou undefined
      if (n1.idFilm > n2.idFilm) {
        return 1;
      }
      if (n1.idFilm < n2.idFilm) {
        return -1;
      }
    }
    return 0; // Renvoie 0 si les deux idFilm sont égaux ou l'un des deux est undefined
  });
}


  // Met à jour un film
 /*  updateFilm(film: Films) {
    const existingFilmIndex = this.films.findIndex(f => f.idFilm === film.idFilm);
    if (existingFilmIndex !== -1) {
      this.films[existingFilmIndex] = film; // Remplacer le film existant par le nouveau
    } else {
      this.ajouterFilm(film); // Si le film n'existe pas, l'ajouter
    }
    this.trierFilms(); // Trie la liste après mise à jour
  } */

  updateFilm(films :Films) : Observable<Films>
{
return this.http.put<Films>(apiURL, films, httpOptions);
}
  /* listeGenres():Genre[] {
    return this.genres;
    }
*/
/* listeGenres():Observable<Genre[]>{
  return this.http.get<Genre[]>(apiURL+"/gen");
  } */

  listeGenres():Observable<genreWrapper>{
    return this.http.get<genreWrapper>(this.apiURLgen);
    }
  /*consulterGenres(id:number): Genre{
    return this.genres.find(gen => gen.idGen == id)!;
    } */
}
