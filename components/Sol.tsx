'use client'

import { useEffect, useState } from 'react'
import { USINAS } from '@/lib/dados'
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

function frase(l: Leitura) {
  if (l.altura > 0.5) return `Sol a ${Math.round(l.altura)}° do horizonte`
  if (l.altura > -6) return 'Crepúsculo, o sol está no horizonte'
  return 'Noite: o sol está abaixo do horizonte'
}

// Inclinações fixas: duas ou três tiras tortas, como papel solto.
const GIRO = [0, -1.4, 0, 1.2, 0, -0.8]
const ALTURA = [38, 30, 44, 34, 40, 27]

export function TirasDoSol() {
  const [agora, setAgora] = useState<Date | null>(null)
  useEffect(() => {
    setAgora(new Date())
    const id = setInterval(() => setAgora(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const tiras = USINAS.map((u) => ({ titulo: u.nome, local: u.local.nome, l: agora ? ler(agora, u.local.lat, u.local.lon) : null }))
  const pindare = agora ? ler(agora, USINAS[0].local.lat, USINAS[0].local.lon) : null

  return (
    <ul className={s.tiras} aria-label="O sol agora sobre cada usina">
      {tiras.map((t, i) => (
        <li key={t.titulo} className={s.tira}
          style={{ '--altura': `${ALTURA[i]}svh`, '--giro': `${GIRO[i]}deg` } as React.CSSProperties}>
          <strong>{t.titulo}</strong>
          <span aria-hidden="true">· · · · · · · · · · · ·</span>
          <span>{t.local}, MA</span>
          {t.l ? (
            <>
              <span>Agora: {t.l.agora}</span>
              <span>{frase(t.l)}</span>
              <span>Nasceu às {t.l.nascer}</span>
              <span>Põe-se às {t.l.por}</span>
            </>
          ) : (
            <>
              <span>Sol de cerca de 12 horas</span>
              <span>todos os dias do ano</span>
            </>
          )}
        </li>
      ))}
      <li className={s.tira} style={{ '--altura': `${ALTURA[4]}svh`, '--giro': `${GIRO[4]}deg` } as React.CSSProperties}>
        <strong>Meio-dia solar</strong>
        <span aria-hidden="true">· · · · · · · · · · · ·</span>
        <span>Pindaré-Mirim, hoje</span>
        {pindare ? (
          <>
            <span>Sol mais alto às {pindare.meio}</span>
            <span>Quase a pino: estamos</span>
            <span>a 3,7° do Equador</span>
          </>
        ) : (
          <span>Perto das 11h50</span>
        )}
      </li>
      <li className={s.tira} style={{ '--altura': `${ALTURA[5]}svh`, '--giro': `${GIRO[5]}deg` } as React.CSSProperties}>
        <strong>BR-222</strong>
        <span aria-hidden="true">· · · · · · · · · · · ·</span>
        <span>Pindaré-Mirim</span>
        <span>até Santa Inês</span>
        <span>as quatro usinas</span>
        <span>à beira da estrada</span>
      </li>
    </ul>
  )
}
