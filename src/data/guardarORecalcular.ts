export type CartaDato = { id: string; dato: string; guardar: boolean; porque: string }

export const MAZO_GUARDAR: CartaDato[] = [
  { id: 'nivel', dato: 'Nivel en el que va el jugador', guardar: true, porque: 'No hay forma de deducirlo: es progreso puro.' },
  { id: 'checkpoint', dato: 'Último checkpoint alcanzado', guardar: true, porque: 'Define dónde reaparece al cargar.' },
  { id: 'vida', dato: 'Vida actual del jugador', guardar: true, porque: 'Cambia con lo que pasó en la partida.' },
  { id: 'items', dato: 'Objetos del inventario y su cantidad', guardar: true, porque: 'Son decisiones y hallazgos del jugador.' },
  { id: 'monedas', dato: 'Monedas acumuladas', guardar: true, porque: 'Se ganan y gastan: no se pueden recalcular.' },
  { id: 'misiones', dato: 'Misiones completadas', guardar: true, porque: 'Marcan qué partes de la historia ya pasaron.' },
  { id: 'fecha', dato: 'Fecha y hora del guardado', guardar: true, porque: 'La pantalla de ranuras la muestra para elegir.' },
  { id: 'vidamax', dato: 'Vida máxima (sale del nivel)', guardar: false, porque: 'Se calcula con una fórmula a partir del nivel.' },
  { id: 'enemigos', dato: 'Posición de cada enemigo', guardar: false, porque: 'Los enemigos se regeneran al cargar la escena.' },
  { id: 'danio', dato: 'Daño total del arma equipada', guardar: false, porque: 'Se obtiene del catálogo del arma: basta su id.' },
  { id: 'peso', dato: 'Peso total del inventario', guardar: false, porque: 'Es la suma de los objetos: se recalcula al cargar.' },
  { id: 'porcentaje', dato: 'Porcentaje del juego completado', guardar: false, porque: 'Se calcula contando las misiones completadas.' },
  { id: 'fps', dato: 'Cuadros por segundo actuales', guardar: false, porque: 'Es un dato del momento, no del progreso.' },
  { id: 'camara', dato: 'Ángulo de la cámara', guardar: false, porque: 'Se reinicia detrás del jugador al cargar.' },
]
