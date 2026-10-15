'use client'

import { useEffect, useState } from 'react'
import { CONJUNTOS } from '@/lib/dados'
import { alturaDoSol, diaSolar } from '@/lib/sol'
import s from './Sol.module.css'

// O Maranhão fica em UTC−3 o ano todo.
const FUSO_MIN = -180

const hm = (minUtc: number) => {
  const m = Math.round((minUtc + FUSO_MIN + 1440) % 1440)
  const h = Math.floor(m / 60)
  const mm = m % 60
  return `${h}h${String(mm).padStart(2, '0')}`
}

interface Leitura {
  altura: number
  nascer: string
  meio: string
  por: string
  agora: string
}

function ler(agora: Date, lat: number, lon: number): Leitura {
  const p = { lat, lon }
  const dia = diaSolar(agora, p)
  return {
    altura: alturaDoSol(agora, p),
    nascer: hm(dia.nascer),
    meio: hm(dia.meio),
    por: hm(dia.por),
    agora: hm(agora.getUTCHours() * 60 + agora.getUTCMinutes()),
  }
}

// O número grande do quadro: a altura do sol, ou o que acontece quando ele não está no céu.
function destaque(l: Leitura) {
  if (l.altura > 0.5) return { valor: `${Math.round(l.altura)}°`, legenda: 'de altura do sol sobre o horizonte' }
  if (l.altura > -6) return { valor: 'Crepúsculo', legenda: 'o sol está na linha do horizonte' }
  return { valor: 'Noite', legenda: 'o sol está abaixo do horizonte' }
}

export function TirasDoSol() {
  const [agora, setAgora] = useState<Date | null>(null)
  useEffect(() => {
    setAgora(new Date())
    const id = setInterval(() => setAgora(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const leituras = CONJUNTOS.map((c) => ({ ...c, l: agora ? ler(agora, c.local.lat, c.local.lon) : null }))
  const pindare = leituras[0].l

  return (
    <ul className={s.tiras} aria-label="O sol agora sobre as usinas">
      {leituras.map((c) => {
        const d = c.l ? destaque(c.l) : null
        return (
          <li key={c.nome} className={s.tira}>
            <strong>{c.nome}, em {c.local.nome}</strong>
            {c.l && d ? (
              <>
                <p className={s.grande}>{d.valor}<span>{d.legenda}, às {c.l.agora}</span></p>
                <dl className={s.horas}>
                  <div><dt>Nasceu</dt><dd>{c.l.nascer}</dd></div>
                  <div><dt>Põe-se</dt><dd>{c.l.por}</dd></div>
                </dl>
              </>
            ) : (
              <p className={s.grande}>12 h<span>de sol por dia, o ano todo</span></p>
            )}
          </li>
        )
      })}
      <li className={`${s.tira} ${s.tiraMeio}`}>
        <strong>Meio-dia solar de hoje, em Pindaré-Mirim</strong>
        <p className={s.grande}>{pindare ? pindare.meio : '11h50'}<span>o sol fica quase a pino, a 3,7° do Equador</span></p>
      </li>
    </ul>
  )
}
