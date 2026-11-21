import { useCallback, useState, useEffect } from "react";
import { PokemonDetailResponse } from "../interfaces/pokemonResponse";
import { kzsvApi } from "../api/kzsvApi";

interface UseDetailPokemon {
  isLoading: boolean;
  detailPokemon?: PokemonDetailResponse;
  errorMessage: string | null;
  loadPokemon: () => Promise<void>;
}

export const useDetailPokemon = ( id: string | number ): UseDetailPokemon => {
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ detailPokemon, setDetailPokemon ] = useState<PokemonDetailResponse>();
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const fetchPokemon = useCallback(async () => {
    const response = await kzsvApi.get<PokemonDetailResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  }, [id]);

  const loadPokemon = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      setDetailPokemon(await fetchPokemon());
    } catch (error) {
      console.error(`Error al cargar el Pokémon ${id}:`, error);
      setErrorMessage('No se pudo cargar el detalle. Toca para reintentar.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchPokemon, id]);

  useEffect(() => {
    let active = true;
    fetchPokemon()
      .then((result) => {
        if (active) setDetailPokemon(result);
      })
      .catch((error: unknown) => {
        console.error(`Error al cargar el Pokémon ${id}:`, error);
        if (active) setErrorMessage('No se pudo cargar el detalle. Toca para reintentar.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchPokemon, id]);

  return { isLoading, detailPokemon, errorMessage, loadPokemon };
}