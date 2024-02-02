export interface Noticia {
  seccion: Seccion
  _id: string
  imagenes: string[]
  titulo: string
  subtitulo: string
  autor: string
  fecha: string
  contenido: string
  comentarios: Comentario[]
}

export interface Seccion {
  nombreSeccion: string
  imagen: string
  iconoIonic?: string
  iconoFontAwesome?: string
}
export interface Comentario {
  nombre: string;
  email: string;
  contenido: string;
}
