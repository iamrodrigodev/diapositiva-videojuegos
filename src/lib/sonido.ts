// Efectos sintetizados con Web Audio, sin archivos de audio.
let ctx: AudioContext | null = null

function tono(frecuencia: number, inicio: number, duracion: number, tipo: OscillatorType = 'square', volumen = 0.08) {
  ctx ??= new AudioContext()
  const t = ctx.currentTime + inicio
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = tipo
  osc.frequency.value = frecuencia
  gain.gain.setValueAtTime(volumen, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duracion)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + duracion)
}

export const sonido = {
  acierto: () => { tono(660, 0, 0.12); tono(990, 0.1, 0.22) },
  error: () => { tono(180, 0, 0.3, 'sawtooth', 0.06) },
  pista: () => { tono(520, 0, 0.08, 'triangle', 0.1) },
  victoria: () => { [523, 659, 784, 1047].forEach((f, i) => tono(f, i * 0.12, 0.25)) },
}

