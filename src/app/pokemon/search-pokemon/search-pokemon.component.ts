import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-component",
  templateUrl: "./search-pokemon.component.html"
})
export class SearchPokemonComponent implements OnInit {
  searchTerm = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(private router: Router,
    private pokemonService: PokemonService) {}

  ngOnInit() {

    this.pokemons$ = this.searchTerm.pipe((
     debounceTime(300),
     distinctUntilChanged(),
     switchMap((term) => this.pokemonService.searchPokemonList(term) )

    );

  }

  search(term: string) {
    this.searchTerm.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    return this.router.navigate(["/pokemon", pokemon.id]);
  }
}
