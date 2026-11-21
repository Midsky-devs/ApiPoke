export interface UserReponse {
  id_user:    number;
  username:   string;
  email:      string;
  password:   string;
  imagen:     string;
  location:   string;
  update:     Date;
}
export enum EstadoTarea{
  pendiente = "Pendiente",
  en_proceso = "En proceso",
  completado = "Completado"
}

export interface TareaResponse{
  id_tarea: number;
  titulo:   string;
  descripcion: string;
  estado:EstadoTarea;
}
export const siguienteEstado = ( estado: EstadoTarea ): EstadoTarea => {
  const estados = Object.values(EstadoTarea);
  return estados[ (estados.indexOf(estado) + 1) % estados.length ];
}
export type LoginReponse = UserReponse | false;

export interface DataResponse {
  total:           number;
  diasFrios:       Dias[];
  diasCalurosos:   Dias[];
  topTemperaturas: Sensor[];
  estadisticas:    Estadisticas;
  ultimasHoras:    Sensor[];
  alertas:         Sensor[];
  hoy:             Sensor[];
  ayer:            Sensor[];
  anteayer:        Sensor[];
}

export interface Sensor {
  id_sensor:           number;
  fecha:               Date;
  distancia_cm:        number;
  distancia_inch:      number;
  temperatura_celcius: number;
  temperatura_f:       number;
}

export interface Dias {
    dia:      Date;
    promedio: number;
}

export interface Estadisticas {
    total:         string;
    temp_promedio: number;
    temp_maxima:   number;
    temp_minimo:   number;
    dist_promedio: number;
}

export interface LibroResponse {
  total: number;
  estado: { id_libro: number; titulo: string }[];
  librosAntes1960: Pick<Libro, 'id_libro' | 'titulo' | 'anio_publicacion'>[];
  librosPorDecada: { decada: number | string; total: number | string }[];
  librosPorGenero: { genero: string; total: number | string }[];
  libroRecienteYAntiguo: {
    libroReciente: Libro | null;
    libroAntiguo: Libro | null;
  };
  autoresConMasDeUnLibro: { autor: string; total: number | string }[];
  librosMexicanosPorAnio: { anio_publicacion: number | string; total: number | string }[];
}


export interface Libro {
  id_libro: number;
  titulo: string;
  autor: string;
  anio_publicacion: number;
  genero: string;
  pais_autor: string;
}