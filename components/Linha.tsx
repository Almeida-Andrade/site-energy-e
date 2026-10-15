'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './Linha.module.css'

export interface Momento {
  titulo: string
  texto: string
  foto: StaticImageData
  alt: string
}

// Espaço vazio antes de cada foto: varia para as fotos subirem e descerem ao longo da fila.
const RESPIRO = [96, 136, 80, 120, 140, 88, 112, 128]

export function Linha({ titulo, momentos }: { titulo: string; momentos: Momento[] }) {
  const fila = useRef<HTMLOListElement>(null)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const el = fila.current
    if (!el) return
    const mede = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgresso(max > 0 ? el.scrollLeft / max : 0)
    }
    mede()
    el.addEventListener('scroll', mede, { passive: true })
    window.addEventListener('resize', mede)
    return () => {
      el.removeEventListener('scroll', mede)
      window.removeEventListener('resize', mede)
    }
  }, [])

  const anda = (sentido: 1 | -1) => {
    const el = fila.current
    if (!el) return
    el.scrollBy({ left: sentido * 312 * 2, behavior: 'smooth' })
  }

  return (
    <div className={s.linha}>
      <div className={s.topo}>
        <h2 id="titulo-obra" className={s.titulo}>{titulo}</h2>
        <div className={s.botoes}>
          <button type="button" onClick={() => anda(-1)} aria-label="Voltar na linha do tempo" disabled={progresso <= 0.001}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>
          </button>
          <button type="button" onClick={() => anda(1)} aria-label="Avançar na linha do tempo" disabled={progresso >= 0.999}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" /></svg>
          </button>
        </div>
      </div>
      <div className={s.barra} aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.08, progresso)})` }} />
      </div>
      <ol ref={fila} className={s.fila} tabIndex={0} aria-labelledby="titulo-obra">
        {momentos.map((m, i) => (
          <li key={m.titulo} className={s.momento} data-entra style={{ '--ordem': Math.min(i, 4) } as React.CSSProperties}>
            <strong>{m.titulo}</strong>
            <p>{m.texto}</p>
            <div style={{ height: RESPIRO[i % RESPIRO.length] }} className={s.respiro} />
            <div className={s.foto}>
              <Image src={m.foto} alt={m.alt} fill sizes="280px" />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
