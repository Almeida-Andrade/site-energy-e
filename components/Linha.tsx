'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import s from './Linha.module.css'

// Um momento da obra: ou uma foto do drone com a data em que foi tirada, ou um marco sem foto.
export type Momento =
  | { data: string; texto: string; foto: StaticImageData; alt: string }
  | { data: string; texto: string; marco: string; cor: string; tinta: string }

export function Linha({ titulo, apoio, momentos }: { titulo: string; apoio: string; momentos: Momento[] }) {
  const fila = useRef<HTMLOListElement>(null)
  const [progresso, setProgresso] = useState(0)

  useEffect(() => {
    const el = fila.current
    if (!el) return
    const mede = () => {
      const max = el.scrollWidth - el.clientWidth
      setProgresso(max > 0 ? el.scrollLeft / max : 1)
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
    el.scrollBy({ left: sentido * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <div className={s.linha}>
      <div className={s.topo}>
        <div className={s.cabeca}>
          <h2 id="titulo-obra" className={s.titulo} data-entra>{titulo}</h2>
          <p className={s.apoio} data-entra style={{ '--ordem': 1 } as React.CSSProperties}>{apoio}</p>
        </div>
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
          <li key={m.data} className={s.momento} data-entra style={{ '--ordem': Math.min(i, 4) } as React.CSSProperties}>
            <div className={s.legenda}>
              <strong>{m.data}</strong>
              <p>{m.texto}</p>
            </div>
            {'foto' in m ? (
              <div className={s.foto}>
                <Image src={m.foto} alt={m.alt} fill sizes="(max-width: 760px) 78vw, 320px" />
              </div>
            ) : (
              <div className={s.marco} style={{ '--cor': m.cor, '--tinta-marco': m.tinta } as React.CSSProperties}>
                <span>{m.marco}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
