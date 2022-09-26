import { Injectable } from "@angular/core";
import { Pokemon } from "./pokemon";
import { POKEMONS } from "./mock-pokemon-list";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
// providedIn: "root"
export class PokemonService {
  constructor(private http: HttpClient) {}

  /* Old
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }*/

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>("api/pokemons").pipe(
      tap((pokemonList) => {
        this.log(pokemonList);
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  /*getPokemonById(pokemonId: number): Pokemon {
    return POKEMONS.find((pokemon) => pokemon.id == pokemonId);
  }*/

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, undefined))
    );
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type' : 'application/json'});
    }

    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  updatePokemon(pokemon: Pokemon) : Observable<null> {
    const httpOptions = {
        headers : new HttpHeaders({ 'Content-Type' : 'application/json'});
    }

    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemon(pokemonId: number) : Observable<null> {
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, null))
    );
  }

  searchPokemonList(term: string) : Observable<Pokemon[]> {

    if (term.length <= 1){
      return of([]);
    }

    return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
      tap((pokemon) => this.log(pokemon)),
      catchError((error) => this.handleError(error, []))
    );
  }

  private log(response: Pokemon[] | Pokemon | undefined) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: any) {
    console.log(error);
    return of(errorValue);
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy"
    ];
  }
}
