import type { ItemClasificable } from '../components/Clasificador'

// Mazo del mini-juego «¿Dónde vive cada dato?»: se reparten 7 cartas al azar por ronda.
export const MAZO_VIDA_DATOS: ItemClasificable[] = [
  { id: 'balas', texto: 'Posición de las balas en pantalla', destino: 'escena', porque: 'cambia cada frame y no sirve fuera del nivel.' },
  { id: 'jefe', texto: 'Vida del jefe actual', destino: 'escena', porque: 'al salir del combate se vuelve a cargar desde cero.' },
  { id: 'particulas', texto: 'Partículas de una explosión', destino: 'escena', porque: 'son efectos visuales temporales.' },
  { id: 'camara', texto: 'Ángulo actual de la cámara', destino: 'escena', porque: 'se recalcula al entrar en cada escena.' },
  { id: 'ia', texto: 'Ruta calculada por un enemigo', destino: 'escena', porque: 'la IA la recalcula constantemente.' },
  { id: 'timer', texto: 'Cuenta regresiva del nivel', destino: 'escena', porque: 'reinicia con cada intento del nivel.' },
  { id: 'musica', texto: 'Música que sigue entre niveles', destino: 'sesion', porque: 'un AudioManager con DontDestroyOnLoad cruza escenas, pero no hace falta guardarlo.' },
  { id: 'acumulado', texto: 'Puntaje de la partida en curso', destino: 'sesion', porque: 'se suma nivel a nivel; solo el resultado final se guarda.' },
  { id: 'conexion', texto: 'Estado de conexión al servidor', destino: 'sesion', porque: 'se vuelve a comprobar al abrir el juego.' },
  { id: 'cache', texto: 'Texturas ya cargadas en memoria', destino: 'sesion', porque: 'es caché: se reconstruye al iniciar.' },
  { id: 'carrito', texto: 'Objetos elegidos en la tienda sin pagar', destino: 'sesion', porque: 'si se cierra el juego, se descartan.' },
  { id: 'volumen', texto: 'Volumen elegido en Opciones', destino: 'disco', porque: 'el jugador espera encontrarlo igual al volver.' },
  { id: 'record', texto: 'Mejor puntaje histórico', destino: 'disco', porque: 'debe sobrevivir entre sesiones.' },
  { id: 'checkpoint', texto: 'Checkpoint «Estación norte»', destino: 'disco', porque: 'es el progreso: perderlo obliga a repetir el juego.' },
  { id: 'logros', texto: 'Logros desbloqueados', destino: 'disco', porque: 'son permanentes por definición.' },
  { id: 'inventario', texto: 'Inventario de la partida guardada', destino: 'disco', porque: 'forma parte del progreso del jugador.' },
  { id: 'controles', texto: 'Controles reasignados', destino: 'disco', porque: 'es una preferencia del jugador.' },
  { id: 'horas', texto: 'Horas totales jugadas', destino: 'disco', porque: 'es una estadística acumulada de todas las sesiones.' },
]
