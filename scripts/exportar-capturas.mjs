import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const URL_BASE = process.env.URL_BASE ?? 'http://localhost:4173/'
const DESDE = Number(process.env.DESDE ?? 1)
const HASTA = Number(process.env.HASTA ?? 33)
const ANCHO = 1920
const ALTO = 1080
const SALIDA = resolve('exportacion')
const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(existsSync)
const SALTAR = /^(Anterior|Siguiente|Ir a la parte \d+|Desde el inicio)$/

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

rmSync(SALIDA, { recursive: true, force: true })
mkdirSync(join(SALIDA, 'diapositivas'), { recursive: true })
mkdirSync(join(SALIDA, 'botones'), { recursive: true })

const perfil = join(tmpdir(), `capturas-${Date.now()}`)
const chrome = spawn(CHROME, ['--headless=new', '--remote-debugging-port=9333', `--user-data-dir=${perfil}`, '--hide-scrollbars', '--mute-audio', '--no-first-run', 'about:blank'], { stdio: 'ignore' })

let version
for (let i = 0; i < 50 && !version; i++) {
  try { version = await (await fetch('http://127.0.0.1:9333/json/version')).json() } catch { await esperar(200) }
}
const objetivo = await (await fetch('http://127.0.0.1:9333/json/new?about:blank', { method: 'PUT' })).json()
const ws = new WebSocket(objetivo.webSocketDebuggerUrl)
await new Promise((r) => ws.addEventListener('open', r, { once: true }))

let siguienteId = 0
const pendientes = new Map()
const eventos = []
ws.addEventListener('message', (m) => {
  const d = JSON.parse(m.data)
  if (d.id && pendientes.has(d.id)) { pendientes.get(d.id)(d); pendientes.delete(d.id) } else if (d.method) eventos.push(d.method)
})
const cdp = (method, params = {}) => new Promise((r, x) => {
  const id = ++siguienteId
  pendientes.set(id, (d) => (d.error ? x(new Error(`${method}: ${d.error.message}`)) : r(d.result)))
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluar = async (expr) => (await cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value

await cdp('Page.enable')
await cdp('Emulation.setDeviceMetricsOverride', { width: ANCHO, height: ALTO, deviceScaleFactor: 1, mobile: false })

let carga = 0
const abrir = async (n) => {
  await evaluar('try { localStorage.clear() } catch {}')
  eventos.length = 0
  await cdp('Page.navigate', { url: `${URL_BASE}?c=${++carga}#${n}` })
  for (let i = 0; i < 100 && !eventos.includes('Page.loadEventFired'); i++) await esperar(50)
  await esperar(1400)
}
const captura = async (archivo) => {
  const { data } = await cdp('Page.captureScreenshot', { format: 'png' })
  writeFileSync(archivo, Buffer.from(data, 'base64'))
}

const LISTA = `(() => {
  const visible = (b) => b.getClientRects().length > 0 && !b.disabled && !b.closest('[role=tablist]')
  return [...document.querySelectorAll('main button')].filter(visible)
})()`
const textoDe = (b) => `(${b}).map((b) => (b.innerText || b.getAttribute('aria-label') || '').trim().replace(/\\s+/g, ' '))`
const listarBotones = () => evaluar(textoDe(LISTA))
const pulsarBoton = (k) => evaluar(`(() => { const b = ${LISTA}[${k}]; if (!b) return false; b.click(); return true })()`)
const pestanas = () => evaluar(`[...document.querySelectorAll('main [role=tab]')].map((t) => t.innerText.trim())`)
const pulsarPestana = (j) => evaluar(`(() => { const t = document.querySelectorAll('main [role=tab]')[${j}]; if (t) t.click() })()`)
const titulo = () => evaluar(`(document.querySelector('main h1, main h2')?.innerText ?? '').trim().replace(/\\s+/g, ' ')`)
const pasoSiguiente = () => evaluar(`(() => { const b = [...document.querySelectorAll('main button')].find((b) => !b.disabled && /^(Siguiente|Ir a la parte \\d+)$/.test(b.innerText.trim())); if (!b) return false; b.click(); return true })()`)
const limpio = (t) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40).toLowerCase() || 'boton'
const nn = (n) => String(n).padStart(2, '0')

const diapositivas = []
const botones = []

for (let n = DESDE; n <= HASTA; n++) {
  await abrir(n)
  const nombre = await titulo()
  const tabs = await pestanas()
  const estados = tabs.length ? tabs.map((t, j) => ({ j, etiqueta: t })) : [{ j: -1, etiqueta: '' }]
  console.log(`${nn(n)} ${nombre} · ${tabs.length} pestañas`)

  for (const { j, etiqueta } of estados) {
    await abrir(n)
    if (j >= 0) { await pulsarPestana(j); await esperar(900) }
    const sufijo = j >= 0 ? `-p${j + 1}` : ''
    const base = `${nn(n)}${sufijo}-base.png`
    await captura(join(SALIDA, 'diapositivas', base))
    diapositivas.push({ archivo: `diapositivas/${base}`, texto: `Diapositiva ${n} · ${nombre}${etiqueta ? ` · pestaña «${etiqueta}»` : ''}` })

    for (let paso = 2; paso <= 40 && (await pasoSiguiente()); paso++) {
      await esperar(500)
      const archivo = `${nn(n)}${sufijo}-paso${nn(paso)}.png`
      await captura(join(SALIDA, 'diapositivas', archivo))
      diapositivas.push({ archivo: `diapositivas/${archivo}`, texto: `Diapositiva ${n} · ${nombre}${etiqueta ? ` · «${etiqueta}»` : ''} · paso ${paso}` })
    }

    await abrir(n)
    if (j >= 0) { await pulsarPestana(j); await esperar(900) }
    const etiquetas = await listarBotones()
    for (let k = 0; k < etiquetas.length; k++) {
      const etiquetaBoton = etiquetas[k]
      if (SALTAR.test(etiquetaBoton)) continue
      await abrir(n)
      if (j >= 0) { await pulsarPestana(j); await esperar(900) }
      if (!(await pulsarBoton(k))) continue
      await esperar(1100)
      const archivo = `${nn(n)}${sufijo}-b${nn(k + 1)}-${limpio(etiquetaBoton)}.png`
      await captura(join(SALIDA, 'botones', archivo))
      botones.push({ archivo: `botones/${archivo}`, texto: `Diapositiva ${n} · ${nombre}${etiqueta ? ` · «${etiqueta}»` : ''} · botón «${etiquetaBoton}»` })

      const vistos = new Set(etiquetas)
      const nuevos = (await listarBotones()).map((t, m) => ({ t, m })).filter(({ t }) => !vistos.has(t) && !SALTAR.test(t)).slice(0, 12)
      for (const { t, m } of nuevos) {
        await abrir(n)
        if (j >= 0) { await pulsarPestana(j); await esperar(900) }
        await pulsarBoton(k)
        await esperar(1100)
        if (!(await pulsarBoton(m))) continue
        await esperar(1100)
        const archivo2 = `${nn(n)}${sufijo}-b${nn(k + 1)}-${nn(m + 1)}-${limpio(t)}.png`
        await captura(join(SALIDA, 'botones', archivo2))
        botones.push({ archivo: `botones/${archivo2}`, texto: `Diapositiva ${n} · ${nombre}${etiqueta ? ` · «${etiqueta}»` : ''} · «${etiquetaBoton}» → «${t}»` })
      }
    }
  }
}

const paginas = (lista, tituloDoc) => `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${tituloDoc}</title><style>
@page { size: ${ANCHO}px ${ALTO + 70}px; margin: 0 }
* { margin: 0; box-sizing: border-box }
body { background: #0b0d12; font: 26px/1.2 system-ui, sans-serif; color: #ece6d6 }
section { width: ${ANCHO}px; height: ${ALTO + 70}px; page-break-after: always; overflow: hidden }
p { height: 70px; padding: 20px 32px; background: #161a22 }
img { display: block; width: ${ANCHO}px; height: ${ALTO}px }
</style></head><body>${lista.map((c, i) => `<section><p>${i + 1}/${lista.length} · ${c.texto.replace(/</g, '&lt;')}</p><img src="${c.archivo}"></section>`).join('')}</body></html>`

const pdf = async (lista, nombreHtml, nombrePdf, tituloDoc) => {
  writeFileSync(join(SALIDA, nombreHtml), paginas(lista, tituloDoc))
  eventos.length = 0
  await cdp('Page.navigate', { url: pathToFileURL(join(SALIDA, nombreHtml)).href })
  for (let i = 0; i < 200 && !eventos.includes('Page.loadEventFired'); i++) await esperar(50)
  await esperar(1500)
  const { data } = await cdp('Page.printToPDF', { printBackground: true, preferCSSPageSize: true, transferMode: 'ReturnAsBase64' })
  writeFileSync(join(SALIDA, nombrePdf), Buffer.from(data, 'base64'))
}

await cdp('Emulation.clearDeviceMetricsOverride')
await pdf(diapositivas, 'diapositivas.html', 'Diapositivas.pdf', 'Diapositivas')
await pdf(botones, 'botones.html', 'Botones.pdf', 'Botones')
console.log(`Listo: ${diapositivas.length} capturas de diapositivas y ${botones.length} de botones en ${SALIDA}`)

ws.close()
chrome.kill()
