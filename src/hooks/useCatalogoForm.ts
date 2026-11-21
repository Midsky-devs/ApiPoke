import { useCallback, useReducer } from 'react';
import {
  CatalogoEditableField,
  CatalogoFormData,
} from '../interfaces/catalogo';
import { useCatalogoApi } from './useCatalogoApi';

interface UseCatalogoForm {
  state: CatalogoFormData;
  handleInputChange: (fieldName: CatalogoEditableField, value: string) => void;
  loadForm: (data: CatalogoFormData) => void;
  handleSubmit: () => Promise<boolean>;
  handleDelete: () => Promise<boolean>;
}

export const initialCatalogoForm: CatalogoFormData = {
  id_catalogo: 0,
  titulo: '',
  autor: '',
  isbn: '',
  editorial: '',
  anio: '',
  genero: '',
  idioma: '',
  numero_paginas: '',
  ubicacion: '',
  imagen_1: '',
  imagen_2: '',
  imagen_3: '',
  imagen_4: '',
};

type Action =
  | { type: 'change'; fieldName: CatalogoEditableField; value: string }
  | { type: 'load'; data: CatalogoFormData };

const formReducer = (
  state: CatalogoFormData,
  action: Action,
): CatalogoFormData => {
  switch (action.type) {
    case 'change':
      return { ...state, [action.fieldName]: action.value };
    case 'load':
      return action.data;
  }
};

export const useCatalogoForm = (): UseCatalogoForm => {
  const [state, dispatch] = useReducer(formReducer, initialCatalogoForm);
  const { createCatalogo, updateCatalogo, deleteCatalogo } = useCatalogoApi();

  const handleInputChange = (
    fieldName: CatalogoEditableField,
    value: string,
  ) => {
    dispatch({ type: 'change', fieldName, value });
  };

  const loadForm = useCallback((data: CatalogoFormData) => {
    dispatch({ type: 'load', data });
  }, []);

  const handleSubmit = async () => {
    if (state.id_catalogo === 0) {
      return createCatalogo(state);
    }
    return updateCatalogo(state);
  };

  const handleDelete = async () => deleteCatalogo(state.id_catalogo);

  return { state, handleInputChange, loadForm, handleSubmit, handleDelete };
};
