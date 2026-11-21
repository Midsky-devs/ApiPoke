import { useCallback, useState, useEffect } from "react";
import { kzsvApi } from "../api/kzsvApi";
import { PokemonDetailResponse, Type} from "../interfaces/pokemonResponse";

export interface TypePokemon {
  name: string;
  color: string;
}

interface UseTypeColorPokemon{
  isLoading:  boolean;
  color:      string[];
}

const tipo: TypePokemon[] = [
  { name: 'normal', color: '#A8A878' },
  { name: 'fighting', color: '#C03028' },
  { name: 'flying', color: '#A890F0' },
  { name: 'poison', color: '#A040A0' },
  { name: 'ground', color: '#E0C068' },
  { name: 'rock', color: '#B8A038' },
  { name: 'bug', color: '#A8B820' },
  { name: 'ghost', color: '#705898' },
  { name: 'steel', color: '#B8B8D0' },
  { name: 'fire', color: '#F08030' },
  { name: 'water', color: '#6890F0' },
  { name: 'grass', color: '#78C850' },
  { name: 'electric', color: '#F8D030' },
  { name: 'psychic', color: '#F85888' },
  { name: 'ice', color: '#98D8D8' },
  { name: 'dragon', color: '#7038F8' },
  { name: 'dark', color: '#705848' },
  { name: 'fairy', color: '#EE99AC' },
  { name: 'default', color: '#68A090' },
];

export const useTypeColorPokemon = ( id: string | number ): UseTypeColorPokemon => {

  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ color, setColor ] = useState<string[]>(['#68A090']);

  const fetchColor = useCallback(async () => {
    const response = await kzsvApi.get<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data.types.map(({ type }) => (
      tipo.find((element) => element.name === type.name)?.color ?? '#68A090'
    ));
  }, [id]);

  useEffect(() => {
    let active = true;
    fetchColor()
      .then((result) => {
        if (active) setColor(result);
      })
      .catch((error: unknown) => {
        console.error(`Error al cargar el tipo del Pokémon ${id}:`, error);
        if (active) setColor(['#68A090']);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchColor, id]);
  
  return { isLoading, color };

}