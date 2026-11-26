export type FormaPersistir = {
  id: string
  nombre: string
  concepto: string
  donde: string
  codigo: string
  pros: string[]
  contras: string[]
}

export const FORMAS: FormaPersistir[] = [
  {
    id: 'playerprefs',
    nombre: 'PlayerPrefs',
    concepto: 'Un almacén clave-valor: cada dato se guarda bajo un nombre (la clave) y se recupera con ese mismo nombre. Unity escribe en disco al llamar a Save() o al cerrar la aplicación correctamente.',
    donde: 'Windows: registro (HKCU\\Software\\<empresa>\\<juego>) · Android: SharedPreferences · WebGL: IndexedDB',
    codigo: `PlayerPrefs.SetFloat("volumen", 0.8f);
PlayerPrefs.SetInt("nivel", 7);
PlayerPrefs.Save();

int nivel = PlayerPrefs.GetInt("nivel", 1); // 1 = por defecto`,
    pros: ['Integrado en Unity, una línea por valor', 'Funciona en todas las plataformas'],
    contras: ['Solo int, float y string sueltos', 'Sin listas, relaciones ni consultas', 'Fácil de editar por el jugador'],
  },
  {
    id: 'json',
    nombre: 'JSON (JsonUtility + File)',
    concepto: 'Serializar es convertir un objeto C# en texto o bytes para guardarlo; deserializar es reconstruirlo. JsonUtility serializa los campos públicos (o con [SerializeField]) de clases marcadas con [Serializable]; no admite Dictionary ni propiedades. BinaryFormatter está obsoleto por inseguro.',
    donde: 'Archivo .json en Application.persistentDataPath',
    codigo: `[System.Serializable]
public class Partida { public int nivel; public string checkpoint; }

string ruta = Path.Combine(Application.persistentDataPath, "partida.json");
File.WriteAllText(ruta, JsonUtility.ToJson(partida));
Partida p = JsonUtility.FromJson<Partida>(File.ReadAllText(ruta));`,
    pros: ['Guarda objetos completos con listas', 'Legible y fácil de depurar'],
    contras: ['Se lee y se escribe el archivo entero', 'Sin consultas: para un top 10 hay que cargar todo y ordenar en C#'],
  },
  {
    id: 'sqlite',
    nombre: 'SQLite',
    concepto: 'Un motor de base de datos completo dentro de un solo archivo: los datos se organizan en tablas y se piden con SQL, sin servidor. Su funcionamiento en Unity se detalla en el Bloque 2.',
    donde: 'Archivo .db en Application.persistentDataPath',
    codigo: `-- Se pide solo lo necesario, sin cargar todo el archivo
SELECT jugador, puntaje
FROM puntuaciones
ORDER BY puntaje DESC
LIMIT 10;`,
    pros: ['Tablas relacionadas y consultas SQL', 'Lee y escribe por filas, no el archivo entero', 'Transacciones: no se corrompe a mitad de un guardado'],
    contras: ['Requiere un plugin', 'Más código inicial que PlayerPrefs o JSON'],
  },
  {
    id: 'servidor',
    nombre: 'Servidor / nube',
    concepto: 'El juego nunca toca la base de datos directamente: envía peticiones HTTP a una API, que valida los datos y los guarda. Las credenciales de la base de datos jamás van dentro del juego.',
    donde: 'Base de datos remota (MySQL, PostgreSQL, Firebase, PlayFab…) detrás de una API',
    codigo: `using var req = UnityWebRequest.Post(
  "https://api.mijuego.com/puntajes", json, "application/json");
yield return req.SendWebRequest();

if (req.result != UnityWebRequest.Result.Success)
  Debug.LogError(req.error);`,
    pros: ['Datos compartidos entre jugadores y dispositivos', 'El servidor valida: más difícil hacer trampa'],
    contras: ['Necesita internet', 'Hay que mantener un backend y pagar hosting'],
  },
]
