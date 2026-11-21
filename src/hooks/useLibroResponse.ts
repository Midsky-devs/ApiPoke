import { useCallback, useEffect, useState } from "react";
import { kzsvApi } from "../api/kzsvApi";
import { LibroResponse } from "../interfaces/pandoraApiResponse";
import { useApiUrl } from "./useApiUrl";

export const useLibroResponse = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ data, setData ] = useState<LibroResponse>();
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const { apiUrl } = useApiUrl();

  const fetchData = useCallback(async () => {
    const response = await kzsvApi.get<LibroResponse>(
      `${apiUrl}/libro/consultas/data`,
    );
    return response.data;
  }, [apiUrl]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      setData(await fetchData());
    } catch (error) {
      console.error("Error al cargar los datos de libros:", error);
      setErrorMessage("No se pudieron cargar los datos de libros.");
    } finally {
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    let active = true;
    fetchData()
      .then((result) => {
        if (active) setData(result);
      })
      .catch((error: unknown) => {
        console.error("Error al cargar los datos de libros:", error);
        if (active) setErrorMessage("No se pudieron cargar los datos de libros.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [fetchData]);

  return { isLoading, data, errorMessage, loadData };

}