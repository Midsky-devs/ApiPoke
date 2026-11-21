import { useCallback, useEffect, useState } from "react";
import { kzsvApi } from "../api/kzsvApi";
import { DataResponse } from "../interfaces/pandoraApiResponse";
import { useApiUrl } from "./useApiUrl";

export const useDataResponse = () => {
  const { apiUrl } = useApiUrl();
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ data, setData ] = useState<DataResponse>();
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const response = await kzsvApi.get<DataResponse>(
      `${apiUrl}/sensors/consultas/data`,
    );
    return response.data;
  }, [apiUrl]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      setData(await fetchData());
    } catch (error) {
      console.error("Error al cargar los datos del sensor:", error);
      setErrorMessage("No se pudieron cargar los datos del sensor.");
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
        console.error("Error al cargar los datos del sensor:", error);
        if (active) setErrorMessage("No se pudieron cargar los datos del sensor.");
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