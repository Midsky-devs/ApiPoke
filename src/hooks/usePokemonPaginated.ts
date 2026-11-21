import { useState, useRef, useEffect, useCallback } from "react";
import { kzsvApi } from "../api/kzsvApi";
import { PokedexReponse, Result, NewPokemon } from "../interfaces/pokemonResponse";

export const usePokemonPaginated = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ pokemonList, setPokemonList ] = useState<NewPokemon[]>([]);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const nextUrl = useRef< string|null >("https://pokeapi.co/api/v2/pokemon");
  const loadingRef = useRef(false);

  const loadPokemon = useCallback(async () => {
    if (loadingRef.current || !nextUrl.current) return;
    loadingRef.current = true;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await kzsvApi.get<PokedexReponse>(nextUrl.current);
      nextUrl.current = response.data.next;

      const newList = response.data.results.map(({ name, url }: Result) => {
        const urlParts = url.split('/');
        const id = urlParts[urlParts.length - 2];
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
        return { id, name, url, image };
      });

      setPokemonList((previous) => [...previous, ...newList]);
    } catch (error) {
      console.error('Error al cargar los Pokémon:', error);
      setErrorMessage('No se pudieron cargar los Pokémon. Toca para reintentar.');
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPokemon();
  }, [loadPokemon]);

  return { isLoading, pokemonList, errorMessage, loadPokemon };

}