import axios from 'axios';
import { useState } from 'react';
import { Alert } from 'react-native';
import { kzsvApi } from '../api/kzsvApi';
import { CatalogoFormData, CatalogoResponse } from '../interfaces/catalogo';
import { useApiUrl } from './useApiUrl';

interface UseCatalogoApi {
  isLoading: boolean;
  listCatalogo: CatalogoResponse[];
  loadCatalogo: () => Promise<void>;
  createCatalogo: (data: CatalogoFormData) => Promise<boolean>;
  updateCatalogo: (data: CatalogoFormData) => Promise<boolean>;
  deleteCatalogo: (id_catalogo: number) => Promise<boolean>;
}

const showApiError = (title: string, error: unknown) => {
  if (axios.isAxiosError<{ message?: string | string[] }>(error)) {
    const message = error.response?.data?.message;
    Alert.alert(
      title,
      Array.isArray(message) ? message.join('\n') : message ?? error.message,
    );
    return;
  }
  

  Alert.alert(
    title,
    error instanceof Error ? error.message : 'Ocurrió un error inesperado.',
  );
};

const toRequestBody = (data: CatalogoFormData) => ({
  titulo: data.titulo.trim(),
  autor: data.autor.trim(),
  isbn: data.isbn.trim(),
  editorial: data.editorial.trim(),
  anio: Number(data.anio),
  genero: data.genero.trim(),
  idioma: data.idioma.trim(),
  numero_paginas: Number(data.numero_paginas),
  ubicacion: data.ubicacion.trim(),
  imagen_1: data.imagen_1 || null,
  imagen_2: data.imagen_2 || null,
  imagen_3: data.imagen_3 || null,
  imagen_4: data.imagen_4 || null,
});

export const useCatalogoApi = (): UseCatalogoApi => {
  const [isLoading, setIsLoading] = useState(false);
  const [listCatalogo, setListCatalogo] = useState<CatalogoResponse[]>([]);
  const { apiUrl } = useApiUrl();
  const urlApi = `${apiUrl}/catalogo`;

  const loadCatalogo = async () => {
    setIsLoading(true);
    try {
      const response =
        await kzsvApi.get<CatalogoResponse[]>(urlApi);
      setListCatalogo(response.data);
    } catch (error) {
      showApiError('No se pudo cargar el catálogo', error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCatalogo = async (data: CatalogoFormData) => {
    try {
      await kzsvApi.post(urlApi, toRequestBody(data));
      return true;
    } catch (error) {
      showApiError('No se pudo crear el libro', error);
      return false;
    }
  };

  const updateCatalogo = async (data: CatalogoFormData) => {
    try {
      await kzsvApi.patch(
        `${urlApi}/${data.id_catalogo}`,
        toRequestBody(data),
      );
      return true;
    } catch (error) {
      showApiError('No se pudo actualizar el libro', error);
      return false;
    }
  };

  const deleteCatalogo = async (id_catalogo: number) => {
    try {
      await kzsvApi.delete(`${urlApi}/${id_catalogo}`);
      return true;
    } catch (error) {
      showApiError('No se pudo eliminar el libro', error);
      return false;
    }
  };

  return {
    isLoading,
    listCatalogo,
    loadCatalogo,
    createCatalogo,
    updateCatalogo,
    deleteCatalogo,
  };
};
