export interface CatalogoResponse {
  id_catalogo: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial: string;
  anio: number;
  genero: string;
  idioma: string;
  numero_paginas: number;
  ubicacion: string;
  imagen_1: string | null;
  imagen_2: string | null;
  imagen_3: string | null;
  imagen_4: string | null;
}

export interface CatalogoFormData {
  id_catalogo: number;
  titulo: string;
  autor: string;
  isbn: string;
  editorial: string;
  anio: string;
  genero: string;
  idioma: string;
  numero_paginas: string;
  ubicacion: string;
  imagen_1: string;
  imagen_2: string;
  imagen_3: string;
  imagen_4: string;
}

export type CatalogoImageField =
  | 'imagen_1'
  | 'imagen_2'
  | 'imagen_3'
  | 'imagen_4';

export type CatalogoEditableField = Exclude<
  keyof CatalogoFormData,
  'id_catalogo'
>;
