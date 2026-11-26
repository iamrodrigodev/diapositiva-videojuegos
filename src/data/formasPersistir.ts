export type FormaPersistir = {
  id: string
  nombre: string
  donde: string
  codigo: string
  pros: string[]
  contras: string[]
}

export const FORMAS: FormaPersistir[] = [
  {
    id: 'playerprefs',
    nombre: 'PlayerPrefs',
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
