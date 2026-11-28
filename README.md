# Persistencia de datos en videojuegos

**Guardado de partidas y tablas de puntuaciones con SQLite en Unity**

Presentación interactiva de 33 diapositivas: una apertura, cuatro bloques y un cierre. Este documento reúne todo su contenido en texto, para leerlo sin abrir la app o pasárselo a otra IA.

- **Integrantes:** Rodrigo Emerson Infanzón Acosta, Carlos Daniel Aguilar Chirinos, Abimael Ernesto Frontado Fajardo (expone el bloque 3) y Esther Mariana Chunga Pacheco.
- **Ejemplo que recorre toda la charla:** *Estación Norte*, un juego de aventura inventado con ranuras de guardado, inventario y un top 10. Su base de datos es el archivo `estacion_norte.db`. Uno de sus checkpoints también se llama «Estación norte».
- **Tecnología de la app:** React 19, TypeScript, Vite y Tailwind. `npm install` y `npm run dev` para verla. Las flechas o RePág/AvPág cambian de diapositiva. El pie muestra la hora de Lima y un cronómetro que corre desde la Agenda hasta «¿Preguntas?». El progreso de los minijuegos se guarda en `localStorage` y se borra con el botón «Borrar progreso» de la portada.

---

## Índice

| Diap. | Bloque | Título | Tipo |
|---|---|---|---|
| 1 | Apertura | Portada | — |
| 2 | Apertura | Agenda | — |
| 3 | 1 · Contexto | La vida de un dato | Pestañas |
| 4 | 1 · Contexto | ¿Dónde vive cada dato? | Minijuego |
| 5 | 1 · Contexto | Formas de persistir | Pestañas |
| 6 | 1 · Contexto | SQL y NoSQL | Pestañas |
| 7 | 1 · Contexto | Concurso | Minijuego |
| 8 | 1 · Contexto | ¿Quién soy? | Minijuego |
| 9 | 1 · Contexto | ¿Quién guarda qué? | Minijuego |
| 10 | 2 · SQLite en Unity | Origen de SQLite | — |
| 11 | 2 · SQLite en Unity | Arquitectura | Pestañas |
| 12 | 2 · SQLite en Unity | Integración en Unity | Pestañas |
| 13 | 2 · SQLite en Unity | DatabaseManager | Código por pasos |
| 14 | 2 · SQLite en Unity | Consultas seguras | Demo + código |
| 15 | 2 · SQLite en Unity | Encuentra el bug | Minijuego |
| 16 | 2 · SQLite en Unity | Conecta los cables | Minijuego |
| 17 | 3 · Guardado de partidas | ¿Qué guardar? | — |
| 18 | 3 · Guardado de partidas | Modelo de datos | Pestañas + código |
| 19 | 3 · Guardado de partidas | Guardar | Código por pasos |
| 20 | 3 · Guardado de partidas | Cargar | Código por pasos |
| 21 | 3 · Guardado de partidas | Ranuras de guardado | Simulador + código |
| 22 | 3 · Guardado de partidas | ¿Guardar o recalcular? | Minijuego |
| 23 | 3 · Guardado de partidas | El juego se cerró | Simulación |
| 24 | 4 · Puntuaciones | Modelo de puntuaciones | Código + demo |
| 25 | 4 · Puntuaciones | Registrar un puntaje | Código por pasos |
| 26 | 4 · Puntuaciones | Top N | Constructor + código |
| 27 | 4 · Puntuaciones | Tu posición | Código por pasos |
| 28 | 4 · Puntuaciones | Límites del ranking local | Demo |
| 29 | 4 · Puntuaciones | Completa la consulta | Minijuego |
| 30 | 4 · Puntuaciones | Sé la base de datos | Minijuego |
| 31 | Cierre | Conclusiones | — |
| 32 | Cierre | ¿Preguntas? | — |
| 33 | Cierre | Referencias | — |

---

## Apertura

### 1 · Portada
- **Título:** «Persistencia de datos en videojuegos».
- **Etiquetas:** Unity · Bases de datos.
- **Tabla decorativa «Progreso de la partida»:** Partida 42 · Nivel 07 · Punto de control «Estación norte».
- **Lista de integrantes.**
- **Botón «Borrar progreso»:** pide confirmación y borra todo lo que la presentación guardó en el navegador.

### 2 · Agenda
| Bloque | Diap. | Contenido |
|---|---|---|
| 1 · Contexto | 03–09 | Qué es persistir en Unity, cuándo hace falta, alternativas y por qué SQLite. |
| 2 · SQLite en Unity | 10–16 | Origen, cómo funciona, cómo se integra y el código básico seguro. |
| 3 · Guardado de partidas | 17–23 | Qué guardar, el modelo de datos, guardar, cargar y ranuras. |
| 4 · Puntuaciones | 24–30 | Registrar puntajes, el top N, tu posición y los límites del ranking local. |

- Cada bloque tiene juegos, y en cada uno participa un voluntario del público.
- Al final hay conclusiones, preguntas y referencias.
- **Nuestro ejemplo:** *Estación Norte*, un juego de aventura inventado con ranuras de guardado, inventario y un top 10. Lo usamos en los 4 bloques.

---

## Bloque 1 · Contexto

### 3 · La vida de un dato
**Idea:** todo lo que está en RAM desaparece en algún momento. **Persistir** es escribirlo en almacenamiento permanente para que sobreviva al cierre del juego.

**Pestaña «Los tres niveles de vida»**
1. **Escena.** Los campos de un `MonoBehaviour` pertenecen a un GameObject. Al cargar otra escena, Unity destruye esos objetos y sus datos.
   ```csharp
   class Enemigo : MonoBehaviour { int vidas = 3; }
   SceneManager.LoadScene("Nivel2"); // vidas se destruye
   ```
2. **Sesión.** Con `DontDestroyOnLoad` o `static`, el dato cruza escenas. Pero sigue en RAM: al cerrar el juego se pierde.
   ```csharp
   class GameManager : MonoBehaviour {
     public static int puntaje;
     void Awake() => DontDestroyOnLoad(gameObject);
   }
   ```
3. **Disco.** Se escribe en un archivo, el registro o una base de datos. Sobrevive al cierre: solo este nivel es persistencia real.
   ```csharp
   string ruta = Path.Combine(Application.persistentDataPath, "partida.json");
   // Windows: AppData/LocalLow/...
   ```

**Pestaña «Rutas de Unity: ¿dónde escribir?»**
| Ruta | Qué contiene | ¿Sirve para guardar? |
|---|---|---|
| `Application.dataPath` | Archivos del juego instalado (carpeta `<juego>_Data` en Windows). | No: en móvil es de solo lectura y en PC se reemplaza al actualizar. |
| `Application.streamingAssetsPath` | Archivos que viajan dentro del build tal cual (p. ej. una base de datos inicial). | Solo lectura; en Android está dentro del APK. |
| `Application.persistentDataPath` | Carpeta del usuario con permiso de escritura que sobrevive a las actualizaciones. | Sí: aquí se guardan las partidas. |

**Pestaña «¿Todo juego necesita base de datos?»**

Casi todo juego persiste algo, pero no todo juego necesita una base de datos: depende de cuántos datos hay y de cómo se usan.

| Nivel | Ejemplo | Qué guarda |
|---|---|---|
| Nada o casi nada | Arcade de una sesión | Se juega y se reinicia; como mucho, el récord. |
| Mínima | Puzzle casual | Ajustes y último nivel: pocos valores sueltos. |
| Estructurada | RPG o aventura | Ranuras de partida, inventario, misiones y puntajes. |
| Compartida | Juego online | Cuentas, rankings globales y progreso entre dispositivos. |

Estación Norte está en «Estructurada»: ranuras, inventario y top 10 en un solo dispositivo.

### 4 · ¿Dónde vive cada dato? (minijuego)
**Mecánica:** el voluntario recibe 7 cartas al azar de un mazo de 18 y las lleva a Escena, Sesión o Disco. «Nuevas cartas» reparte otra mano.

| Dato | Nivel | Por qué |
|---|---|---|
| Posición de las balas en pantalla | Escena | Cambia cada frame y no sirve fuera del nivel. |
| Vida del jefe actual | Escena | Al salir del combate se vuelve a cargar desde cero. |
| Partículas de una explosión | Escena | Son efectos visuales temporales. |
| Ángulo actual de la cámara | Escena | Se recalcula al entrar en cada escena. |
| Ruta calculada por un enemigo | Escena | La IA la recalcula constantemente. |
| Cuenta regresiva del nivel | Escena | Reinicia con cada intento del nivel. |
| Música que sigue entre niveles | Sesión | Un AudioManager con DontDestroyOnLoad cruza escenas, pero no hace falta guardarlo. |
| Puntaje de la partida en curso | Sesión | Se suma nivel a nivel; solo el resultado final se guarda. |
| Estado de conexión al servidor | Sesión | Se vuelve a comprobar al abrir el juego. |
| Texturas ya cargadas en memoria | Sesión | Es caché: se reconstruye al iniciar. |
| Carrito de la tienda que se mantiene al cambiar de nivel | Sesión | Cruza escenas, pero si se cierra el juego se descarta. |
| Volumen elegido en Opciones | Disco | El jugador espera encontrarlo igual al volver. |
| Mejor puntaje histórico | Disco | Debe sobrevivir entre sesiones. |
| Checkpoint «Estación norte» | Disco | Es el progreso: perderlo obliga a repetir el juego. |
| Logros desbloqueados | Disco | Son permanentes por definición. |
| Inventario de la partida guardada | Disco | Forma parte del progreso del jugador. |
| Controles reasignados | Disco | Es una preferencia del jugador. |
| Horas totales jugadas | Disco | Es una estadística acumulada de todas las sesiones. |

### 5 · Formas de persistir
Hay una pestaña por cada opción y una final, «¿Cómo elegir?».

**PlayerPrefs**
- **Qué es:** un almacén clave-valor. Cada dato se guarda bajo un nombre y se recupera con ese mismo nombre. Unity escribe en disco al llamar a `Save()` o al cerrar la aplicación correctamente.
- **Dónde se guarda:** en Windows, en el registro (`HKCU\Software\<empresa>\<juego>`); en Android, en SharedPreferences; en WebGL, en IndexedDB.
  ```csharp
  PlayerPrefs.SetFloat("volumen", 0.8f);
  PlayerPrefs.SetInt("nivel", 7);
  PlayerPrefs.Save();
  int nivel = PlayerPrefs.GetInt("nivel", 1); // 1 = por defecto
  ```
- **Ventajas:** integrado en Unity, una línea por valor; funciona en todas las plataformas.
- **Desventajas:** solo int, float y string sueltos; sin listas, relaciones ni consultas; el jugador lo edita fácilmente.

**JSON (JsonUtility + File)**
- **Qué es:** serializar es convertir un objeto C# en texto o bytes para guardarlo, y deserializar es reconstruirlo. JsonUtility serializa los campos públicos (o con `[SerializeField]`) de las clases marcadas con `[Serializable]`. No admite Dictionary ni propiedades. BinaryFormatter está obsoleto porque es inseguro.
- **Dónde se guarda:** un archivo `.json` en `persistentDataPath`.
  ```csharp
  [System.Serializable]
  public class Partida { public int nivel; public string checkpoint; }
  string ruta = Path.Combine(Application.persistentDataPath, "partida.json");
  File.WriteAllText(ruta, JsonUtility.ToJson(partida));
  Partida p = JsonUtility.FromJson<Partida>(File.ReadAllText(ruta));
  ```
- **Ventajas:** guarda objetos completos con listas; es legible y fácil de depurar.
- **Desventajas:** se lee y se escribe el archivo entero; no tiene consultas, así que para un top 10 hay que cargar todo y ordenar en C#.

**SQLite**
- **Qué es:** un motor de base de datos completo dentro de un solo archivo. Los datos se organizan en tablas y se piden con SQL, sin servidor.
- **Dónde se guarda:** un archivo `.db` en `persistentDataPath`.
  ```sql
  SELECT nombre, precio FROM objetos WHERE tipo_id = 2; -- 2 = llave
  ```
- **Ventajas:** tablas relacionadas y consultas SQL; lee y escribe por filas, no el archivo entero; las transacciones evitan que se corrompa a mitad de un guardado.
- **Desventajas:** requiere un plugin; necesita más código inicial que PlayerPrefs o JSON.

**Servidor / nube**
- **Qué es:** el juego nunca toca la base de datos directamente. Envía peticiones HTTP a una API, que valida los datos y los guarda. Las credenciales de la base jamás van dentro del juego.
- **Dónde se guarda:** una base remota (MySQL, PostgreSQL, Firebase, PlayFab…) detrás de una API.
  ```csharp
  using var req = UnityWebRequest.Post("https://api.mijuego.com/puntajes", json, "application/json");
  yield return req.SendWebRequest();
  if (req.result != UnityWebRequest.Result.Success) Debug.LogError(req.error);
  ```
- **Ventajas:** datos compartidos entre jugadores y dispositivos; el servidor valida, así que es más difícil hacer trampa.
- **Desventajas:** necesita internet; hay que mantener un backend y pagar el hosting.

**¿Cómo elegir?**
| Opción | Volumen | Consultas | Alcance | Plataformas | Seguridad |
|---|---|---|---|---|---|
| PlayerPrefs | Pocos valores sueltos | Ninguna | Local | Todas | Editable por el jugador |
| JSON | Un objeto que se guarda entero | Cargar todo y filtrar en C# | Local | Todas | Editable salvo que se cifre |
| **SQLite** | Muchos registros relacionados | SQL completo | Local | PC y móvil · WebGL no | Editable salvo que se cifre |
| Servidor / nube | Sin límite práctico | SQL o API del servicio | Online, compartido | Todas, con internet | Lo valida el servidor |

Las preguntas se hacen en este orden; el primer «sí» da la opción:
1. ¿Se comparte entre jugadores o dispositivos? → Servidor.
2. ¿Hay muchos datos que se consultan u ordenan? → SQLite.
3. ¿Es un objeto que se guarda y carga entero? → JSON.
4. ¿Son solo unos pocos ajustes? → PlayerPrefs.

### 6 · SQL y NoSQL
**Bases de datos desde cero.** Ejemplo de Estación Norte:
- tabla `tipos (id PK, nombre)`, con las filas (1, herramienta) y (2, llave);
- tabla `objetos (id PK, nombre, precio, tipo_id FK)`, con las filas (1, Linterna, 30, 1) y (2, Llave roja, 50, 2);
- consulta: `SELECT nombre, precio FROM objetos WHERE tipo_id = 2;`.

Vocabulario:
- **Tabla:** agrupa datos de un mismo tipo.
- **Fila (registro):** un elemento concreto.
- **Columna (campo):** un atributo con tipo fijo.
- **Llave primaria (PK):** identifica cada fila sin repetirse.
- **Llave foránea (FK):** apunta a la PK de otra tabla y crea la relación.
- **Consulta:** una instrucción SQL que lee o modifica datos.

**SQL vs NoSQL.** La Llave roja como documento NoSQL: `{ "id": 2, "nombre": "Llave roja", "precio": 50, "tipo": { "id": 2, "nombre": "llave" } }`. Se lee de una vez, pero el tipo queda copiado en cada objeto: si cambia, hay que corregirlos todos.

| Criterio | SQL | NoSQL |
|---|---|---|
| Estructura | Tablas con esquema fijo | Esquema flexible: cada documento puede tener campos distintos |
| Relaciones | Llaves foráneas y JOIN | Datos anidados o duplicados |
| Consultas | SQL estándar: filtrar, ordenar, agrupar | API propia de cada motor |
| Consistencia | Transacciones ACID | Muchos priorizan disponibilidad y velocidad |
| Escala | Vertical: un servidor más potente | Horizontal: muchos servidores |
| Motores | SQLite, MySQL, PostgreSQL, SQL Server | MongoDB, Firestore, LevelDB, Redis |

**Tipos de NoSQL.** «NoSQL» agrupa varios modelos:
- **Documento** (MongoDB, Firestore): objetos tipo JSON, cada uno con su propia forma. En juegos, el perfil completo de un jugador en un documento.
- **Clave-valor** (Redis, LevelDB): un diccionario gigante, muy rápido (`sesion:ana → "token-9f2c"`). En juegos, las sesiones activas o los trozos (chunks) de un mundo abierto.

**Transacciones: la idea.** Una transacción agrupa varias escrituras en una sola unidad. Si algo falla a la mitad, no se aplica ninguna (atomicidad), y lo confirmado sobrevive aunque el juego se cierre de golpe (durabilidad). Las bases SQL, SQLite incluida, ofrecen transacciones; muchas NoSQL las relajan para escalar. El código está en el Bloque 2.

### 7 · Concurso (minijuego)
**Mecánica:** 5 preguntas al azar de un banco de 10, con 20 segundos por pregunta. Responder rápido da más puntos y hay racha. Se responde con las teclas 1–4 (1 = A … 4 = D).

| Pregunta | Respuesta correcta | Explicación |
|---|---|---|
| Un script tiene `int nivel = 7;`. Cierras el juego y lo vuelves a abrir. ¿Cuánto vale nivel? | Su valor inicial | Vivía en RAM: sin guardarla en disco, se pierde al cerrar. |
| ¿Qué logra DontDestroyOnLoad sobre el GameManager? | Que cruce escenas, pero se pierde al cerrar el juego | Es persistencia de sesión: sigue en RAM. |
| ¿En qué ruta se deben escribir las partidas? | `Application.persistentDataPath` | Es la única con escritura que sobrevive a las actualizaciones. |
| Solo guardas volumen e idioma. ¿Qué conviene? | PlayerPrefs | Pocos valores sueltos: una base sería excesiva. |
| ¿Qué significa «serializar»? | Convertir un objeto C# en texto o bytes para guardarlo | Deserializar es el camino inverso. |
| Leer solo las llaves del catálogo sin cargar todo el archivo | SQLite | Un WHERE pide solo esas filas; un JSON obliga a leerlo entero. |
| Jugadores en distintos celulares deben ver el mismo ranking | Un servidor o la nube | Un archivo local no se comparte. |
| El juego se cierra mientras guarda partida e inventario. ¿Qué evita que quede a medias? | Una transacción (atomicidad) | Todo o nada. |
| ¿Por qué PlayerPrefs no sirve para el inventario completo? | Solo guarda valores sueltos (int, float, string) | Una lista de ítems relacionados no encaja en pares sueltos. |
| En una base SQL, ¿cómo se sabe de qué tipo es cada objeto? | Por una llave foránea (`tipo_id`) | La FK apunta a la PK de la tabla tipos. |

### 8 · ¿Quién soy? (minijuego)
**Mecánica:** 5 juegos reales al azar de 8. Para cada uno se adivina con qué tecnología persiste sus datos, entre 4 opciones.
- Empiezas con 1 pista; cada pista extra baja el premio: 300 → 200 → 100 puntos.
- La pista 2 es el tipo de tecnología.
- La pista 3 da la letra inicial, la letra final y la longitud de la última palabra de la tecnología.

| Juego | Tecnología | Tipo | Dato | Fuente |
|---|---|---|---|---|
| Civilization VI | SQLite | SQL local | Los datos del juego (civilizaciones, unidades, edificios) viven en bases SQLite; los mods los cambian con SQL. | Civilization Wiki · Modding (Civ6) |
| Minecraft Java | Archivos NBT | Archivo binario propio | Cada mundo se guarda en archivos de región (.mca) con el formato NBT de Mojang. | Minecraft Wiki · Anvil file format |
| Minecraft Bedrock | LevelDB | NoSQL clave-valor | Chunks y entidades se guardan en un LevelDB modificado por Mojang. | Mojang · leveldb (GitHub) |
| Fortnite | MongoDB | NoSQL de documentos | Su base principal de servicios usaba 9 shards de MongoDB (postmortem con 3,4 M de jugadores simultáneos). | Epic Games, 2018 |
| EVE Online | SQL Server | SQL en servidor | Todo el universo compartido persiste en Microsoft SQL Server. | CCP Games |
| Pokémon GO | Cloud Datastore | NoSQL en la nube | Fue su base principal; en el lanzamiento recibió más de 50 veces la carga prevista. | Google Cloud Blog, 2016 |
| Stardew Valley | Archivos XML | Archivo de texto | Cada partida es un XML que la comunidad edita. | Stardew Valley Wiki · Saves |
| Clash of Clans | MySQL | SQL en servidor | Tres desarrolladores de servidor mantenían unas 300 bases MySQL en AWS para millones de aldeas. | AWS · Innovator: Supercell |

### 9 · ¿Quién guarda qué? (minijuego)
**Mecánica:** un juego real combina varias tecnologías. El voluntario reparte 10 datos de Estación Norte entre 4 destinos:
- **PlayerPrefs:** pocos valores sueltos que se leen al iniciar.
- **JSON:** un objeto que se guarda y carga entero, o que el jugador exporta y comparte.
- **SQLite:** muchos registros relacionados que se consultan, filtran y ordenan en el dispositivo.
- **Servidor:** datos compartidos o con valor real; el servidor es la fuente de verdad.

| Dato | Destino |
|---|---|
| 3 ranuras de partida con su inventario | SQLite |
| Volumen y brillo | PlayerPrefs |
| Ranking mundial | Servidor |
| Perfil de accesibilidad: un objeto con 25 opciones anidadas que se carga entero | JSON |
| Inventario de cada partida | SQLite |
| Idioma elegido | PlayerPrefs |
| Compras con dinero real | Servidor |
| Top 10 local con fechas | SQLite |
| Nivel creado por el jugador para compartir | JSON |
| Historial de 500 partidas jugadas | SQLite |

**Conclusión:** por eso elegimos SQLite para Estación Norte. Es la que más datos guarda (4 de 10: partidas, inventario, historial y top 10), con consultas y sin servidor.

---

## Bloque 2 · SQLite en Unity

### 10 · Origen de SQLite
- **Un destructor de la Marina:** D. Richard Hipp trabajaba para General Dynamics en el software de control de daños de destructores de la Marina de EE. UU.
- **El problema:** ese programa usaba un servidor Informix, que necesitaba un administrador; si el servidor caía, el programa caía con él.
- **Su idea:** una base SQL que viva dentro del programa, sin servidor, sin administrador y que resista cortes de energía.
- **Animación:** el barco envía una consulta al servidor Informix, el servidor cae, y SQLite, dentro del barco, no depende de él.
- **Línea de tiempo:**
  - 2000: Hipp diseña SQLite en primavera; la versión 1.0 sale en agosto.
  - 2004: SQLite 3, el formato de archivo que se sigue usando hoy.
  - Hoy: está en cada Android, iPhone, navegador y en miles de juegos.
- **Datos:** es de dominio público (gratis para cualquier uso); hay más de 1 billón de bases en uso (estimado); es el motor de base de datos más desplegado.

### 11 · Arquitectura
**Servidor vs embebido**
- **Cliente-servidor:** el recorrido es Juego → Red → Servidor de BD (MySQL, PostgreSQL) → Disco. Cada operación viaja por la red hasta un programa aparte que hay que instalar y mantener encendido.
- **Embebido (SQLite):** el recorrido es Juego → SQLite (una librería dentro del juego) → `estacion_norte.db`. SQLite se compila dentro del juego: la operación no sale del programa y va directo al archivo.

**Tipos de datos.** Solo hay 5 tipos de almacenamiento:
- INTEGER: `nivel = 7`, `puntaje = 9850`.
- REAL: `mejor_tiempo = 92.5`.
- TEXT: `checkpoint = «Estación norte»`.
- BLOB: la captura de la partida.
- NULL: una ranura vacía.

No hay tipo booleano ni de fecha: se guardan como INTEGER (0/1) y como TEXT («2026-11-26»).

**Tipado dinámico:** la columna solo tiene una *afinidad*, un tipo preferido. Si el valor se puede convertir, lo convierte; si no, lo guarda tal como llegó.
```sql
CREATE TABLE prueba (nivel INTEGER);
INSERT INTO prueba VALUES ('7');     -- se guarda como INTEGER 7
INSERT INTO prueba VALUES ('siete'); -- ¡se guarda como TEXT, sin error!
CREATE TABLE prueba (nivel INTEGER) STRICT; -- rechaza tipos incorrectos (desde 3.37)
```

**Protección de datos**
- **Corte de luz:** al reabrir, el diario restaura o descarta lo que quedó a medias.
- **Cierre forzado** (Alt+F4, un crash o el móvil que mata la app): igual que un corte, nada queda a medias.
- **Error a mitad:** Rollback deshace toda la transacción.
- **Dos escrituras a la vez:** un bloqueo deja escribir de a una; la otra espera o recibe «ocupado».
- **Disco lleno:** la transacción falla completa y la base sigue como antes.
- **Diarios:**
  - Rollback journal (`.db-journal`): antes de modificar, copia lo original aparte y, si algo falla, lo restaura.
  - WAL (`.db-wal`): escribe los cambios al final de otro archivo y luego los pasa al `.db`; lecturas y escrituras no se bloquean. Se activa una vez con `PRAGMA journal_mode = WAL;`.

### 12 · Integración en Unity
**ADO.NET u ORM**
- **SQL a mano (ADO.NET):** tú escribes cada sentencia; es más código, pero ves y controlas lo que se ejecuta.
  ```csharp
  cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
  cmd.Parameters.AddWithValue("@inicio", ahora);
  cmd.ExecuteNonQuery();
  ```
- **ORM (mapeo objeto-relacional):** una clase es una tabla y cada objeto, una fila; la librería escribe el SQL. Ejemplo: `db.Insert(new Sesion { Inicio = ahora });`.
- **Opciones de ORM:**
  - sqlite-net: ORM ligero, el más usado en Unity y móvil.
  - SQLite4Unity3d: sqlite-net preparado para Unity, trae las librerías nativas.
  - EF Core y Dapper: fallan con IL2CPP (iOS, consolas), no se recomiendan.
- En la charla se usa SQL a mano, para ver el SQL real de los bloques 3 y 4.

**Instalación**
1. **Api Compatibility Level → .NET Framework** (Edit › Project Settings › Player). Mono.Data.Sqlite usa clases que el perfil por defecto no trae.
2. **Copiar `Mono.Data.Sqlite.dll` y `System.Data.dll` a `Assets/Plugins`.** Son la API de C# y vienen con Unity.
3. **Agregar el motor nativo en `Assets/Plugins/<plataforma>`.** En Windows es `sqlite3.dll`, de sqlite.org. En Android es `libsqlite3.so`, del paquete SQLite4Unity3d o compilado con el NDK.
4. **Marcar las plataformas de cada plugin en el Inspector,** para que cada build incluya solo su librería.
```
Assets/Plugins/
├─ Mono.Data.Sqlite.dll   ← API de C#
├─ System.Data.dll        ← su dependencia
├─ x86_64/sqlite3.dll     ← motor para Windows
└─ Android/libs/arm64-v8a/libsqlite3.so ← motor para Android
```
El resultado son dos piezas: la API en C#, igual en todas las plataformas, y el motor nativo, uno por plataforma.

**¿Dónde vive el .db?**
- `StreamingAssets` viene dentro del build y es de solo lectura; sirve para traer una base inicial.
- Esa base se copia una vez, al primer arranque, a `persistentDataPath`, que es de lectura y escritura.
```csharp
IEnumerator CopiarBaseInicial() {
  string destino = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
  if (File.Exists(destino)) yield break;
  string origen = Path.Combine(Application.streamingAssetsPath, "estacion_norte.db");
  using var req = UnityWebRequest.Get(origen);  // en Android se lee como descarga
  yield return req.SendWebRequest();
  if (req.result != UnityWebRequest.Result.Success) yield break;
  File.WriteAllBytes(destino, req.downloadHandler.data);
}
// antes de abrir la base: yield return CopiarBaseInicial();
```
La copia debe terminar antes de abrir la conexión: `Open()` crearía un `.db` vacío y la copia ya no se haría. Si no hay base inicial, no se copia nada y SQLite crea el archivo al abrir.

Rutas de `persistentDataPath`:
- Windows: `C:\Users\<usuario>\AppData\LocalLow\<empresa>\<juego>\`.
- Android: `/storage/emulated/0/Android/data/<paquete>/files/`.
- iOS: `<carpeta de la app>/Documents/`.

**Plataformas.** El motor de SQLite está escrito en C y se compila para cada sistema y procesador.
| Plataforma | ¿Funciona? | Motor nativo | Nota |
|---|---|---|---|
| Windows | Sí | sqlite3.dll | Se descarga de sqlite.org |
| macOS · Linux | Sí | libsqlite3 | Suele venir en el sistema |
| Android | Sí | libsqlite3.so | Uno por procesador (ARM64, ARMv7) |
| iOS | Sí | — | SQLite ya viene con el sistema |
| WebGL | No | — | El navegador no carga librerías nativas; los archivos van a un disco virtual (IndexedDB) |

En WebGL se usa PlayerPrefs, JSON o un servidor.

**Herramientas: DB Browser for SQLite** (sqlitebrowser.org, gratuito)
1. Instalarlo.
2. Encontrar el archivo con `Debug.Log(Application.persistentDataPath);`.
3. Abrir `estacion_norte.db`: «Hoja de datos» muestra las tablas y «Ejecutar SQL» sirve para probar consultas.
4. Cerrar el juego antes de editar, porque si escriben los dos a la vez la base se bloquea.

La vista de ejemplo muestra la tabla `sesiones` con 3 filas (2026-11-24T18:02:11, 2026-11-25T09:40:57 y 2026-11-26T21:15:03) y `SELECT COUNT(*) FROM sesiones; -- 3`.

### 13 · DatabaseManager (código por pasos)
**Parte 1 · Abrir y crear la tabla**
```csharp
using System.IO;
using Mono.Data.Sqlite;
using UnityEngine;

public class DatabaseManager : MonoBehaviour {
  public static string Conexion;

  void Awake() {
    string ruta = Path.Combine(Application.persistentDataPath, "estacion_norte.db");
    Conexion = "URI=file:" + ruta;

    using var con = new SqliteConnection(Conexion);
    con.Open();
    using var cmd = con.CreateCommand();
    cmd.CommandText = "CREATE TABLE IF NOT EXISTS sesiones (id INTEGER PRIMARY KEY, inicio TEXT)";
    cmd.ExecuteNonQuery();
  }
}
```
1. **Importar:** `Mono.Data.Sqlite` trae `SqliteConnection` y los comandos.
2. **Un script en la escena:** va en un GameObject de la primera escena y guarda la cadena de conexión en un campo `static`.
3. **¿Dónde está el archivo?:** en `persistentDataPath`; `URI=file:` indica que es un archivo local.
4. **Abrir:** `Open()` abre el archivo y lo crea si no existe; `using var` lo cierra solo.
5. **Crear una tabla de prueba:** `sesiones`. `IF NOT EXISTS` evita el error en el segundo arranque. Las tablas de partidas y puntajes llegan en los bloques 3 y 4.

**Parte 2 · Escribir y leer**
```csharp
public class Sesiones : MonoBehaviour {
  void Start() {
    using var con = new SqliteConnection(DatabaseManager.Conexion);
    con.Open();
    using var cmd = con.CreateCommand();

    cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
    cmd.Parameters.AddWithValue("@inicio", System.DateTime.Now.ToString("s"));
    cmd.ExecuteNonQuery();

    cmd.Parameters.Clear();
    cmd.CommandText = "SELECT id, inicio FROM sesiones";
    using var lector = cmd.ExecuteReader();
    while (lector.Read())
      Debug.Log($"Sesión {lector.GetInt32(0)}: {lector.GetString(1)}");
  }
}
```
1. **Abrir con la misma conexión:** cualquier script reutiliza `DatabaseManager.Conexion`. Este registra cada vez que se inicia el juego.
2. **Escribir una fila:** `@inicio` es un parámetro; `ExecuteNonQuery()` se usa porque no devuelve filas.
3. **Pedir las filas:** se limpia el parámetro y `ExecuteReader()` devuelve un lector que avanza fila por fila.
4. **Recorrerlas:** `Read()` pasa a la siguiente fila, y `GetInt32(0)` y `GetString(1)` leen las columnas por posición. En la consola aparece `Sesión 1: 2026-11-24T18:02:11`.

### 14 · Consultas seguras
**Inyección SQL (demo interactiva).** El jugador busca en la tienda (Linterna, Llave roja, Botiquín). El campo trae escrito un ataque: `Linterna'; DROP TABLE objetos; --`.
- **Concatenando texto:** `"SELECT * FROM objetos WHERE nombre = '" + nombre + "'"`. La comilla cierra el texto y lo que sigue se ejecuta como otra orden. Al ejecutar, la tabla `objetos` se borra.
- **Con parámetro:** `WHERE nombre = @nombre` más `AddWithValue("@nombre", nombre)`. La base recibe la orden y el dato por separado, y el dato nunca se ejecuta. Con el ataque devuelve 0 filas y la tabla sigue intacta; con «Linterna» devuelve 1 fila.

**Transacciones (código por pasos)**
```csharp
using var con = new SqliteConnection(DatabaseManager.Conexion);
con.Open();
using var tx = con.BeginTransaction();
try {
  using var cmd = con.CreateCommand();
  cmd.Transaction = tx;
  cmd.CommandText = "INSERT INTO sesiones (inicio) VALUES (@inicio)";
  cmd.Parameters.AddWithValue("@inicio", System.DateTime.Now.ToString("s"));
  cmd.ExecuteNonQuery();
  tx.Commit();
} catch (SqliteException e) {
  tx.Rollback();
  Debug.LogError("No se pudo guardar: " + e.Message);
}
```
1. `BeginTransaction()` marca el inicio del «todo o nada».
2. `cmd.Transaction = tx` enlaza el comando con la transacción.
3. Se escribe con parámetro; aquí podrían ir varias escrituras que deben ir juntas.
4. Solo con `Commit()` los cambios quedan en disco.
5. Ante un error, `Rollback()` descarta todo y se registra el problema.

### 15 · Encuentra el bug (minijuego)
**Mecánica:** 3 fragmentos al azar de 6. Se tocan las líneas con error y se pulsa Revisar.
- Puntos: +100 por bug encontrado, −50 por falsa alarma y −25 por pista.
- Hay cronómetro y récord.

1. **Buscar un objeto por nombre**
   ```csharp
   public string BuscarTipo(string nombre) {
     var con = new SqliteConnection(DatabaseManager.Conexion);
     con.Open();
     using var cmd = con.CreateCommand();
     cmd.CommandText = "SELECT tipo_id FROM objetos WHERE nombre = '" + nombre + "'";
     return cmd.ExecuteScalar()?.ToString();
   }
   ```
   - **Línea 2:** sin `using`, la conexión nunca se cierra y el archivo queda bloqueado.
   - **Línea 5:** concatena el nombre, así que hay inyección SQL; debe usar `@nombre`.
2. **Preparar la base al arrancar** (usa `Application.dataPath` y `CREATE TABLE sesiones …`)
   - **Línea 2:** `dataPath` es la carpeta del juego instalado: en móvil es de solo lectura y en PC se reemplaza al actualizar. Debe ser `persistentDataPath`.
   - **Línea 6:** sin `IF NOT EXISTS`, el segundo arranque falla porque la tabla ya existe.
3. **Guardar dentro de una transacción** (INSERT con `ahora` concatenado y `catch (SqliteException) { }`)
   - **Línea 5:** el valor está concatenado; debe ir como parámetro `@inicio`.
   - **Línea 8:** el catch vacío se traga el error y el jugador cree que guardó. Falta el `Rollback()` explícito y avisar del fallo (como en la diapositiva 14).
4. **Contar las sesiones jugadas** (usa `streamingAssetsPath` y `return cmd.ExecuteNonQuery();` con un `SELECT COUNT(*)`)
   - **Línea 2:** `streamingAssetsPath` es de solo lectura (en Android está dentro del APK); la base vive en `persistentDataPath`.
   - **Línea 7:** `ExecuteNonQuery` no devuelve filas. Un SELECT se lee con `ExecuteReader`, o con `ExecuteScalar` si devuelve un solo valor.
5. **Registrar una sesión en una transacción** (`con.Close()` tras `Open()` y `tx.Commit()` antes del INSERT)
   - **Línea 3:** cierra la conexión justo después de abrirla, y `BeginTransaction` falla con la conexión cerrada.
   - **Línea 7:** confirma antes de escribir, así que el INSERT queda fuera de la transacción.
6. **Borrar una sesión** (`"DELETE FROM sesiones WHERE id = " + id` y `con.Open()` al final)
   - **Línea 4:** el valor está concatenado; debe ir como parámetro `@id`, aunque sea un número.
   - **Línea 6:** abre la conexión después de ejecutar, así que `ExecuteNonQuery` falla.

### 16 · Conecta los cables (minijuego)
**Mecánica:** «El DatabaseManager se quedó sin energía». Hay 6 cables al azar de 10: se arrastra desde cada pieza de código hasta lo que hace y se pulsa «Dar energía».
- Cada pista suma 10 segundos.
- El récord es el mejor tiempo.

| Código | Qué hace |
|---|---|
| `con.Open()` | Abre el archivo .db y lo crea si no existe |
| `ExecuteNonQuery()` | Ejecuta una sentencia que no devuelve filas |
| `ExecuteReader()` | Ejecuta un SELECT y recorre las filas |
| `BeginTransaction()` | Inicia un grupo de escrituras «todo o nada» |
| `tx.Commit()` | Confirma y deja los cambios en disco |
| `tx.Rollback()` | Descarta las escrituras si algo falló |
| `@nombre` | Envía el dato aparte y evita la inyección SQL |
| `IF NOT EXISTS` | Crea la tabla solo la primera vez |
| `using var con` | Cierra la conexión sola al terminar |
| `persistentDataPath` | Carpeta con escritura donde vive el .db |

---

## Bloque 3 · Guardado de partidas

### 17 · ¿Qué guardar?
**Regla de oro:** guardar lo mínimo para reconstruir la partida. Lo que se puede calcular, se calcula al cargar.
- **Se guarda (estado):**
  - nivel actual (progreso puro);
  - checkpoint (dónde reaparece);
  - vida actual (depende de lo que pasó);
  - inventario (lo que encontró el jugador).
- **Se recalcula (derivado):**
  - vida máxima (sale de una fórmula con el nivel);
  - enemigos (se regeneran con la escena);
  - peso del inventario (suma de los objetos);
  - estadísticas del arma (vienen del catálogo, basta su nombre).
```csharp
public class EstadoPartida {
  public int nivel;
  public string checkpoint;
  public int vida;
  public Dictionary<string, int> inventario = new Dictionary<string, int>();
}
```
Guardar de más ocupa espacio y, peor, se desincroniza: si el peso guardado no coincide con los objetos, ¿cuál es el correcto?

### 18 · Modelo de datos
**Diagrama:** `jugadores` 1—N `partidas` (un jugador, varias partidas) y `partidas` 1—N `inventario` (una partida, varios objetos).
```sql
CREATE TABLE IF NOT EXISTS jugadores (
  id     INTEGER PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS partidas (
  id          INTEGER PRIMARY KEY,
  jugador_id  INTEGER NOT NULL REFERENCES jugadores(id),
  ranura      INTEGER NOT NULL,
  nivel       INTEGER NOT NULL,
  checkpoint  TEXT,
  vida        INTEGER NOT NULL,
  guardado_en TEXT NOT NULL,
  UNIQUE (jugador_id, ranura)
);

CREATE TABLE IF NOT EXISTS inventario (
  partida_id INTEGER NOT NULL REFERENCES partidas(id) ON DELETE CASCADE,
  item       TEXT NOT NULL,
  cantidad   INTEGER NOT NULL,
  PRIMARY KEY (partida_id, item)
);

INSERT OR IGNORE INTO jugadores (id, nombre) VALUES (1, 'Jugador 1');
```
- **Jugadores:** cada uno tiene un `nombre` que no se repite.
- **Dueño de la partida:** `jugador_id` apunta a `jugadores(id)`, así que no se puede guardar una partida de un jugador que no existe.
- **Estado:** los mismos campos de `EstadoPartida`, más la fecha para el menú de ranuras.
- **Una partida por ranura:** `UNIQUE (jugador_id, ranura)` impide dos partidas en la misma ranura; al guardar de nuevo, el upsert de la diapositiva 19 la reemplaza.
- **Inventario:** una fila por objeto; `ON DELETE CASCADE` borra los objetos al borrar la partida.
- **Jugador inicial:** un juego de un solo jugador crea el Jugador 1; `OR IGNORE` no hace nada si ya existe.

**Abrir con llaves foráneas** (en DatabaseManager):
```csharp
public static SqliteConnection Abrir() {
    var con = new SqliteConnection(Conexion);
    con.Open();
    using var cmd = con.CreateCommand();
    cmd.CommandText = "PRAGMA foreign_keys = ON;";
    cmd.ExecuteNonQuery();
    return con;
}
```
SQLite no revisa las FK ni hace CASCADE si no se le pide, y el ajuste dura solo esa conexión. Todo el guardado y las puntuaciones abren con `DatabaseManager.Abrir()`, y quien la pide la cierra con `using`.

### 19 · Guardar (código por pasos)
```csharp
public static class Guardado {
  public static void Guardar(int jugadorId, int ranura, EstadoPartida e) {
    using var con = DatabaseManager.Abrir();
    using var tx = con.BeginTransaction();
    using var cmd = con.CreateCommand();
    cmd.Transaction = tx;
    try {
      cmd.CommandText = @"INSERT INTO partidas (jugador_id, ranura, nivel, checkpoint, vida, guardado_en)
        VALUES (@jugador, @ranura, @nivel, @checkpoint, @vida, datetime('now'))
        ON CONFLICT (jugador_id, ranura) DO UPDATE SET
          nivel = @nivel, checkpoint = @checkpoint, vida = @vida, guardado_en = datetime('now')";
      cmd.Parameters.AddWithValue("@jugador", jugadorId);
      cmd.Parameters.AddWithValue("@ranura", ranura);
      cmd.Parameters.AddWithValue("@nivel", e.nivel);
      cmd.Parameters.AddWithValue("@checkpoint", e.checkpoint);
      cmd.Parameters.AddWithValue("@vida", e.vida);
      cmd.ExecuteNonQuery();

      cmd.CommandText = "SELECT id FROM partidas WHERE jugador_id = @jugador AND ranura = @ranura";
      long partidaId = (long)cmd.ExecuteScalar();

      cmd.Parameters.Clear();
      cmd.Parameters.AddWithValue("@partida", partidaId);
      cmd.CommandText = "DELETE FROM inventario WHERE partida_id = @partida";
      cmd.ExecuteNonQuery();

      cmd.CommandText = "INSERT INTO inventario (partida_id, item, cantidad) VALUES (@partida, @item, @cantidad)";
      var item = cmd.Parameters.Add("@item", System.Data.DbType.String);
      var cantidad = cmd.Parameters.Add("@cantidad", System.Data.DbType.Int32);
      foreach (var par in e.inventario) {
        item.Value = par.Key;
        cantidad.Value = par.Value;
        cmd.ExecuteNonQuery();
      }
      tx.Commit();
    } catch (SqliteException) {
      tx.Rollback();
      throw;
    }
  }
}
```
1. **Qué recibe:** el jugador, la ranura y el `EstadoPartida` del momento.
2. **Todo en una transacción:** la partida y el inventario se guardan juntos.
3. **Upsert:** si la ranura está vacía, `INSERT` crea la fila; si ya existe, `ON CONFLICT … DO UPDATE` la sobrescribe. `datetime('now')` guarda la fecha. Requiere SQLite 3.24 o superior.
4. **Parámetros:** todos los valores van como parámetros, nada concatenado.
5. **Id de la partida:** se reutilizan `@jugador` y `@ranura` con `ExecuteScalar()`.
6. **Vaciar el inventario anterior:** se reescribe completo.
7. **Escribir cada objeto:** la sentencia se prepara una vez y solo cambian `item` y `cantidad`.
8. **Confirmar o deshacer:** `Commit()`, o bien `Rollback()` y `throw`, para que el juego muestre un mensaje.

### 20 · Cargar (código por pasos)
**Leer de la base**
```csharp
public static class Carga {
  public static EstadoPartida Cargar(int jugadorId, int ranura) {
    using var con = DatabaseManager.Abrir();
    using var cmd = con.CreateCommand();
    cmd.CommandText = "SELECT id, nivel, checkpoint, vida FROM partidas WHERE jugador_id = @jugador AND ranura = @ranura";
    cmd.Parameters.AddWithValue("@jugador", jugadorId);
    cmd.Parameters.AddWithValue("@ranura", ranura);

    var estado = new EstadoPartida();
    long partidaId;
    using (var fila = cmd.ExecuteReader()) {
      if (!fila.Read()) return null;
      partidaId = fila.GetInt64(0);
      estado.nivel = fila.GetInt32(1);
      estado.checkpoint = fila.IsDBNull(2) ? null : fila.GetString(2);
      estado.vida = fila.GetInt32(3);
    }

    cmd.Parameters.Clear();
    cmd.CommandText = "SELECT item, cantidad FROM inventario WHERE partida_id = @partida";
    cmd.Parameters.AddWithValue("@partida", partidaId);
    using var objetos = cmd.ExecuteReader();
    while (objetos.Read())
      estado.inventario[objetos.GetString(0)] = objetos.GetInt32(1);
    return estado;
  }
}
```
- Si la ranura está vacía, devuelve `null` y el juego decide qué hacer.
- `IsDBNull` cubre el checkpoint vacío de una partida recién empezada.
- Lo derivado se recalcula después.

**Usarlo en el juego**
```csharp
public class MenuRanuras : MonoBehaviour {
  public void AlPulsarRanura(int ranura) {
    EstadoPartida estado = Carga.Cargar(1, ranura);
    if (estado == null) {
      Debug.Log("Ranura vacía: empieza una partida nueva");
      estado = new EstadoPartida { nivel = 1, vida = 100 };
    }
    PartidaActual.Estado = estado;
    SceneManager.LoadScene("Nivel" + estado.nivel);
  }
}
public static class PartidaActual { public static EstadoPartida Estado; }
```
- El botón «Continuar» llama con la ranura 0, la del autoguardado.
- Un campo `static` conserva el estado al cambiar de escena (el nivel de vida «sesión» del bloque 1).
- La escena del nivel lee `PartidaActual.Estado` y coloca al jugador en su checkpoint.

### 21 · Ranuras de guardado
**Simulador de ranuras (interactivo).**
- La partida actual empieza en nivel 3 · Estación norte · 80 de vida, y «Jugar un rato» la hace avanzar.
- Hay 3 ranuras, cada una con Guardar, Cargar y Borrar.
- Cada acción muestra el SQL equivalente: `INSERT … ON CONFLICT DO UPDATE`, `SELECT … WHERE ranura = N` y `DELETE … WHERE ranura = N`.
- Cada ranura es una fila de `partidas`; por eso guardar en una ranura ocupada la reemplaza.

**Autoguardado**
- Ocurre en dos momentos: al cruzar un checkpoint (Muelle sur → Estación norte → Faro) y al minimizar el juego en el móvil.
- Va siempre a la ranura 0, reservada para el autoguardado, así no pisa las ranuras del jugador.
```csharp
public class Checkpoint : MonoBehaviour {
  public string nombre;
  void OnTriggerEnter(Collider otro) {
    if (!otro.CompareTag("Player")) return;
    PartidaActual.Estado.checkpoint = nombre;
    Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}
public class AutoguardadoMovil : MonoBehaviour {
  void OnApplicationPause(bool pausado) {
    if (pausado && PartidaActual.Estado != null) Guardado.Guardar(1, 0, PartidaActual.Estado);
  }
}
```
`OnApplicationPause(true)` llega al pasar a segundo plano: es el último momento seguro, porque después el sistema puede cerrar la app sin avisar.

**Actualizar el juego (migración).**
- **El problema:** en la versión 1.0 el jugador ya tiene partidas. La 1.1 agrega monedas, pero el archivo del jugador no tiene esa columna.
- **La solución:** migrar al abrir.
```csharp
cmd.CommandText = "PRAGMA user_version";
long version = (long)cmd.ExecuteScalar();
if (version < 1) { cmd.CommandText = CrearTablas; cmd.ExecuteNonQuery(); }
if (version < 2) {
  cmd.CommandText = "ALTER TABLE partidas ADD COLUMN monedas INTEGER NOT NULL DEFAULT 0";
  cmd.ExecuteNonQuery();
}
cmd.CommandText = "PRAGMA user_version = 2";
cmd.ExecuteNonQuery();
```
- `user_version` es un número guardado dentro del archivo; un archivo nuevo empieza en 0 y se le crean las tablas.
- Si vale 1 (la versión 1.0 anotaba `user_version = 1`), `ADD COLUMN` agrega las monedas sin tocar las partidas.
- Al final se anota 2. Todo esto va en el DatabaseManager, al abrir la base.

### 22 · ¿Guardar o recalcular? (minijuego)
**Mecánica:** 8 cartas al azar de 14. Para cada una se decide Guardar (tecla G) o Recalcular (tecla R). Hay racha, cronómetro y récord.

| Dato | Respuesta | Por qué |
|---|---|---|
| Nivel en el que va el jugador | Guardar | No hay forma de deducirlo: es progreso puro. |
| Último checkpoint alcanzado | Guardar | Define dónde reaparece. |
| Vida actual del jugador | Guardar | Cambia con lo que pasó en la partida. |
| Objetos del inventario y su cantidad | Guardar | Son decisiones y hallazgos del jugador. |
| Monedas acumuladas | Guardar | Se ganan y gastan: no se pueden recalcular. |
| Ranura elegida por el jugador | Guardar | Dice en qué fila de partidas se escribe. |
| Fecha y hora del guardado | Guardar | La pantalla de ranuras la muestra. |
| Vida máxima (sale del nivel) | Recalcular | Fórmula a partir del nivel. |
| Posición de cada enemigo | Recalcular | Se regeneran al cargar la escena. |
| Daño total del arma equipada | Recalcular | Sale del catálogo: basta su nombre. |
| Peso total del inventario | Recalcular | Es la suma de los objetos. |
| Cantidad de objetos distintos | Recalcular | Se cuenta desde el inventario. |
| Cuadros por segundo actuales | Recalcular | Dato del momento, no del progreso. |
| Ángulo de la cámara | Recalcular | Se reinicia detrás del jugador. |

### 23 · El juego se cerró (simulación)
Un guardado son varias escrituras seguidas. ¿Qué pasa si el juego se cierra de golpe justo en medio (un cuelgue, la batería agotada, un apagón)?
- **Lo guardado:** nivel 7 · Estación norte · Linterna, Botiquín ×2.
- **Lo que se quiere guardar:** nivel 8 · Faro · Linterna, Llave roja.
- **Pasos del guardado:**
  1. cambiar nivel y lugar;
  2. vaciar el inventario viejo;
  3. guardar la Linterna;
  4. guardar la Llave roja.
- **Interacción:** se pulsa «Guardar partida» y, mientras avanza, se cierra el juego con el botón, minimizando, apagando la pantalla o recargando la página. Luego se pulsa «Volver a abrir el juego».
- **Resultado:**
  - Sin transacción, la partida queda rota: se guardó la mitad y se pierden objetos.
  - Con transacción, todo queda como antes de guardar: solo se pierde el último avance, nunca la partida.
- **Mensaje final:** «Transacción = todo o nada».

---

## Bloque 4 · Puntuaciones

### 24 · Modelo de puntuaciones
El ranking de Estación Norte guarda el mejor puntaje de cada jugador en cada nivel, en el mismo `estacion_norte.db` de las partidas.
```sql
CREATE TABLE IF NOT EXISTS records (
  jugador_id INTEGER NOT NULL REFERENCES jugadores(id),
  nivel      INTEGER NOT NULL,
  puntaje    INTEGER NOT NULL,
  fecha      TEXT NOT NULL,
  PRIMARY KEY (jugador_id, nivel)
);

CREATE INDEX IF NOT EXISTS idx_nivel_puntaje
  ON records (nivel, puntaje DESC);
```
- **Qué guarda:** solo importa el mejor puntaje; un historial de todas las partidas sería otra tabla sin la llave `(jugador_id, nivel)`.
- **El índice:** mantiene los puntajes ya ordenados por nivel, así que el top 10 no recorre toda la tabla.
- **Cuándo se crea:** es un paso más de la migración: `if (version < 3)` crea la tabla y el índice, y anota `user_version = 3`.

**¿Qué es un índice? (demo):** consulta «top 3 del nivel 1».
- Sin índice se leen las 14 filas y después se ordena.
- Con el índice `(nivel, puntaje DESC)` se salta al nivel 1, ya ordenado, y se leen solo 3 filas.
- Es como el índice de un libro.

**Datos de ejemplo** (los usan las diapositivas 24, 26 y 30):
| Jugador | Nivel 1 | Nivel 2 | Nivel 3 |
|---|---|---|---|
| ana | 9850 | 5600 | 12040 |
| luis | 7420 | 8030 | 10400 |
| sofia | 8910 | 7750 | 9990 |
| leo | 6120 | 8800 | 11870 |
| mia | 9100 | 4980 | — |

### 25 · Registrar un puntaje (código por pasos)
```csharp
public static class Puntajes {
  public static void Registrar(string nombre, int nivel, int puntaje) {
    using var con = DatabaseManager.Abrir();
    using var cmd = con.CreateCommand();
    cmd.Parameters.AddWithValue("@nombre", nombre);
    cmd.CommandText = "INSERT OR IGNORE INTO jugadores (nombre) VALUES (@nombre)";
    cmd.ExecuteNonQuery();

    cmd.CommandText = @"INSERT INTO records (jugador_id, nivel, puntaje, fecha)
      VALUES ((SELECT id FROM jugadores WHERE nombre = @nombre), @nivel, @puntaje, datetime('now'))
      ON CONFLICT (jugador_id, nivel) DO UPDATE
        SET puntaje = excluded.puntaje, fecha = excluded.fecha
        WHERE excluded.puntaje > records.puntaje";
    cmd.Parameters.AddWithValue("@nivel", nivel);
    cmd.Parameters.AddWithValue("@puntaje", puntaje);
    cmd.ExecuteNonQuery();
  }
}
```
1. Al terminar el nivel, la pantalla pide un nombre, como en un arcade: en el mismo dispositivo compiten varias personas, aunque las partidas sean del Jugador 1.
2. Si el nombre es nuevo, se crea en `jugadores` (`OR IGNORE` por el `UNIQUE`).
3. El `id` se busca por nombre dentro del mismo INSERT.
4. Es el mismo upsert del guardado. `excluded` es la fila que se intentó insertar.
5. El `WHERE` actualiza solo si el puntaje nuevo es mayor.
6. Todo va como parámetro: el nombre lo escribe el jugador y podría traer una inyección.

### 26 · Top N
**Arma tu consulta (interactivo):** se elige el nivel (1, 2 o 3) y el top (3, 5 o 10), y se ve el SQL generado y su resultado:
```sql
SELECT j.nombre, r.puntaje
FROM records r
JOIN jugadores j ON j.id = r.jugador_id
WHERE r.nivel = 1
ORDER BY r.puntaje DESC
LIMIT 3;
```

**En C#**
```csharp
public class FilaRanking { public string nombre; public int puntaje; }

public static class Ranking {
  public static List<FilaRanking> Top(int nivel, int cantidad) {
    var lista = new List<FilaRanking>();
    using var con = DatabaseManager.Abrir();
    using var cmd = con.CreateCommand();
    cmd.CommandText = @"SELECT j.nombre, r.puntaje
      FROM records r JOIN jugadores j ON j.id = r.jugador_id
      WHERE r.nivel = @nivel
      ORDER BY r.puntaje DESC
      LIMIT @cantidad";
    cmd.Parameters.AddWithValue("@nivel", nivel);
    cmd.Parameters.AddWithValue("@cantidad", cantidad);
    using var lector = cmd.ExecuteReader();
    while (lector.Read())
      lista.Add(new FilaRanking { nombre = lector.GetString(0), puntaje = lector.GetInt32(1) });
    return lista;
  }
}
```
- `JOIN` trae el nombre desde `jugadores`.
- `WHERE` filtra el nivel, `ORDER BY … DESC` pone el mayor primero y `LIMIT` corta.
- El índice de la diapositiva 24 hace todo esto rápido.

### 27 · Tu posición
**Calcular el puesto** (otro método de `Ranking`):
```csharp
public static int Posicion(int jugadorId, int nivel) {
  using var con = DatabaseManager.Abrir();
  using var cmd = con.CreateCommand();
  cmd.CommandText = @"SELECT posicion FROM (
      SELECT jugador_id, RANK() OVER (ORDER BY puntaje DESC) AS posicion
      FROM records WHERE nivel = @nivel)
    WHERE jugador_id = @jugador";
  cmd.Parameters.AddWithValue("@nivel", nivel);
  cmd.Parameters.AddWithValue("@jugador", jugadorId);
  object valor = cmd.ExecuteScalar();
  return valor == null ? 0 : System.Convert.ToInt32(valor);
}
```
- `RANK()` da a cada fila su puesto, y los empates lo comparten. Requiere SQLite 3.25 o superior.
- La consulta de afuera se queda con el puesto del jugador («quedaste #27», aunque no esté en el top 10).
- Si el jugador no tiene fila, el método devuelve 0.

**Mostrarlo en Unity**
```csharp
public class PantallaRanking : MonoBehaviour {
  public Transform contenedor;
  public TMP_Text prefabFila;
  public TMP_Text textoPosicion;

  public void Mostrar(int nivel, int jugadorId) {
    foreach (Transform hijo in contenedor) Destroy(hijo.gameObject);
    int puesto = 1;
    foreach (FilaRanking fila in Ranking.Top(nivel, 10)) {
      TMP_Text texto = Instantiate(prefabFila, contenedor);
      texto.text = $"{puesto++}. {fila.nombre}   {fila.puntaje}";
    }
    int mio = Ranking.Posicion(jugadorId, nivel);
    textoPosicion.text = mio > 0 ? $"Tu puesto: #{mio}" : "Aún sin puntaje";
  }
}
```
- El contenedor tiene un Vertical Layout Group, y cada fila es una copia del prefab.
- Con empates, el puesto se leería también con `RANK()`.
- La maqueta muestra «Estación Norte · Nivel 3»: 1. ana 12.040, 2. leo 11.870, 3. luis 10.400, 4. sofia 9.990. Debajo: «Tu puesto (leo): #2».

### 28 · Límites del ranking local
- **No es global:** cada dispositivo tiene su propio `.db`.
- **Se puede editar:** con DB Browser cualquiera abre `estacion_norte.db` y cambia su puntaje.
- **Se pierde con el dispositivo:** en el móvil, desinstalar el juego borra `persistentDataPath` y el ranking con él; al cambiar de celular, el ranking se queda en el viejo.
- **¿Y si el ranking importa?** Si es mundial o tiene premios, los puntajes van a un servidor que los valida. SQLite sigue siendo ideal para el ranking personal y sin conexión.
- **Demo «hacer trampa en 1 clic»:** `UPDATE records SET puntaje = 999999 WHERE jugador_id = 3 AND nivel = 3;` pasa a «tú» de 8.200 al primer puesto.

### 29 · Completa la consulta (minijuego)
**Mecánica:** 4 consultas con huecos. Se toca un hueco (queda marcado en ámbar) y luego la ficha que va ahí; un hueco lleno se vacía tocándolo dos veces.
- Sobran fichas.
- Hay cronómetro y récord.

| Consulta | Texto (huecos entre [ ]) | Fichas trampa |
|---|---|---|
| Top 10 del nivel 2 | `SELECT jugador_id, puntaje FROM records [WHERE] nivel = 2 [ORDER BY] puntaje [DESC] [LIMIT] 10;` | ASC, GROUP BY |
| Guardar solo el récord | `INSERT INTO records (…) VALUES (1, 2, 8800, datetime('now')) ON [CONFLICT] (jugador_id, nivel) DO [UPDATE] SET puntaje = [excluded].puntaje, fecha = datetime('now') WHERE [excluded].puntaje > records.puntaje;` | DELETE, NEW |
| Numerar los puestos | `SELECT jugador_id, [RANK]() OVER (ORDER BY puntaje [DESC]) AS posicion FROM records WHERE nivel = 3;` | COUNT, ASC |
| Acelerar el ranking | `CREATE [INDEX] idx_nivel_puntaje [ON] records (nivel, puntaje DESC);` | TABLE, FROM |

### 30 · Sé la base de datos (minijuego)
**Mecánica:** «Ahora tú eres SQLite». Sobre las 14 filas de `records + jugadores`, se tocan en orden las filas que devolvería cada consulta. Todas son `SELECT j.nombre, r.nivel, r.puntaje FROM records r JOIN jugadores j ON j.id = r.jugador_id …`.

| Condición | Resultado correcto | Lección |
|---|---|---|
| `WHERE r.nivel = 1 ORDER BY r.puntaje DESC LIMIT 3` | ana 9850, mia 9100, sofia 8910 | Filtrar, ordenar y quedarse con 3. |
| `WHERE r.nivel = 2 ORDER BY r.puntaje ASC LIMIT 2` | mia 4980, ana 5600 | ASC ordena del menor al mayor. |
| `WHERE r.nivel = 3 AND r.puntaje > 10500 ORDER BY r.puntaje DESC` | ana 12040, leo 11870 | Las dos condiciones a la vez; sin LIMIT salen todas. |
| `WHERE r.puntaje > 9000 ORDER BY r.puntaje DESC LIMIT 5` | ana 12040, leo 11870, luis 10400, sofia 9990, ana 9850 (nivel 1) | Sin filtro de nivel compiten todos los niveles. |

---

## Cierre

### 31 · Conclusiones
**SQLite sí conviene cuando:**
- hay muchos datos relacionados (partidas, inventario, récords);
- hace falta consultar (filtrar, ordenar, el top 10);
- todo vive en el dispositivo, sin internet;
- hay que proteger el guardado con transacciones.

**No conviene cuando:**
- solo hay unos pocos ajustes (basta PlayerPrefs);
- es un objeto que se guarda entero (basta JSON);
- los datos son compartidos o el ranking es mundial (hace falta un servidor);
- el juego es para WebGL (no hay SQLite nativo).

**Resumen por bloque:**
1. Persistir es sobrevivir al cierre; no todo juego necesita una base de datos.
2. SQLite vive dentro del juego: un archivo, sin servidor, con consultas seguras.
3. Guardar lo mínimo, en una transacción; cargar y reconstruir.
4. Ranking con ORDER BY, LIMIT y RANK(); local, no global.

### 32 · ¿Preguntas?
Pantalla de agradecimiento con confeti: «Gracias · ¿Preguntas?». Debajo: «Persistencia de datos en videojuegos: guardado de partidas y tablas de puntuaciones con SQLite en Unity».

### 33 · Referencias
- Amazon Web Services. (s.f.). *AWS Innovator: Supercell*. https://aws.amazon.com/solutions/case-studies/innovators/supercell/
- Bell, A. (2021). *The untold story of SQLite with Richard Hipp* (N.º 66) [Pódcast]. CoRecursive. https://corecursive.com/066-sqlite-with-richard-hipp/
- CCP Games. (2022). *A history of EVE database server hardware*. https://www.eveonline.com/news/view/a-history-of-eve-database-server-hardware
- Civilization Wiki. (s.f.). *Modding (Civ6)/How to alter base game content*. Fandom.
- DB Browser for SQLite. (s.f.). https://sqlitebrowser.org/
- Elmasri, R., y Navathe, S. B. (2016). *Fundamentals of database systems* (7.ª ed.). Pearson.
- Epic Games. (2018, 8 de febrero). *Postmortem of service outage at 3.4M CCU*.
- Google Cloud. (2016). *Bringing Pokémon GO to life on Google Cloud*.
- Huertas, R. (s.f.). *SQLite4Unity3d* [Software]. GitHub.
- Krueger, F. (s.f.). *sqlite-net* [Software]. GitHub.
- Minecraft Wiki. (s.f.). *Anvil file format*.
- Mojang Studios. (s.f.). *leveldb* [Software]. GitHub.
- SQLite. (s.f.). *About SQLite*; *Datatypes in SQLite*; *Most widely deployed and used database engine*; *PRAGMA statements*; *STRICT tables*; *UPSERT*; *Window functions*; *Write-ahead logging*. https://www.sqlite.org/
- Stardew Valley Wiki. (s.f.). *Saves*.
- Unity Technologies. (s.f.). Scripting API: *Application.persistentDataPath*, *JsonUtility*, *MonoBehaviour.OnApplicationPause*, *Object.DontDestroyOnLoad*, entre otras.

La lista completa, con todas las URL, está en [src/data/referencias.ts](src/data/referencias.ts).
