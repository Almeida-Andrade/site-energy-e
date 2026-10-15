// Posição do sol e nascer/pôr do dia (algoritmo da NOAA, precisão de ~1 minuto).
// Astronomia pura: nada aqui vem da operação das usinas.

const rad = Math.PI / 180

export interface Ponto { lat: number; lon: number }

function diaJuliano(d: Date) {
  return d.getTime() / 86400000 + 2440587.5
}

function solar(jd: number) {
  const t = (jd - 2451545) / 36525
  const l0 = (280.46646 + t * (36000.76983 + t * 0.0003032)) % 360
  const m = 357.52911 + t * (35999.05029 - 0.0001537 * t)
  const e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t)
  const c =
    Math.sin(m * rad) * (1.914602 - t * (0.004817 + 0.000014 * t)) +
    Math.sin(2 * m * rad) * (0.019993 - 0.000101 * t) +
    Math.sin(3 * m * rad) * 0.000289
  const lon = l0 + c - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * t) * rad)
  const eps0 = 23 + (26 + (21.448 - t * (46.815 + t * (0.00059 - t * 0.001813))) / 60) / 60
  const eps = eps0 + 0.00256 * Math.cos((125.04 - 1934.136 * t) * rad)
  const decl = Math.asin(Math.sin(eps * rad) * Math.sin(lon * rad)) / rad
  const y = Math.tan((eps / 2) * rad) ** 2
  const eqTempo =
    (4 / rad) *
    (y * Math.sin(2 * l0 * rad) -
      2 * e * Math.sin(m * rad) +
      4 * e * y * Math.sin(m * rad) * Math.cos(2 * l0 * rad) -
      0.5 * y * y * Math.sin(4 * l0 * rad) -
      1.25 * e * e * Math.sin(2 * m * rad))
  return { decl, eqTempo }
}

/** Altura do sol acima do horizonte, em graus, no instante dado. */
export function alturaDoSol(d: Date, p: Ponto) {
  const { decl, eqTempo } = solar(diaJuliano(d))
  const minutosUtc = d.getUTCHours() * 60 + d.getUTCMinutes() + d.getUTCSeconds() / 60
  const tempoSolar = (minutosUtc + eqTempo + 4 * p.lon + 1440) % 1440
  const angHorario = tempoSolar / 4 - 180
  const cosZen =
    Math.sin(p.lat * rad) * Math.sin(decl * rad) +
    Math.cos(p.lat * rad) * Math.cos(decl * rad) * Math.cos(angHorario * rad)
  return 90 - Math.acos(Math.min(1, Math.max(-1, cosZen))) / rad
}

/** Nascer, meio-dia solar e pôr do sol do dia de `d`, em minutos UTC. */
export function diaSolar(d: Date, p: Ponto) {
  const meioDiaUtc = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12))
  const { decl, eqTempo } = solar(diaJuliano(meioDiaUtc))
  const cosH =
    Math.cos(90.833 * rad) / (Math.cos(p.lat * rad) * Math.cos(decl * rad)) -
    Math.tan(p.lat * rad) * Math.tan(decl * rad)
  const h = Math.acos(Math.min(1, Math.max(-1, cosH))) / rad
  const meio = 720 - 4 * p.lon - eqTempo
  return { nascer: meio - 4 * h, meio, por: meio + 4 * h }
}
