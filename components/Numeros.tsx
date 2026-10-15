'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import s from './Numeros.module.css'

export interface Numero {
  inteiro: string
  decimal: string
  legenda: string
  foto: StaticImageData
  alt: string
}

// O livro-razão das usinas: apontar (ou tocar) um número mostra a foto que ele descreve no quadro ao lado.
export function Numeros({ numeros }: { numeros: Numero[] }) {
  const [ativo, setAtivo] = useState(0)
  return (
    <div className={s.numeros}>
      <div className={s.lado}>
        <h2 id="titulo-numeros" className={s.titulo} data-entra>
          <span className={s.suave}>Quatro usinas,</span><br />um só sol
        </h2>
        <div className={s.quadro}>
          {numeros.map((n, i) => (
            <Image key={n.legenda} src={n.foto} alt={i === ativo ? n.alt : ''} fill sizes="(max-width: 760px) 100vw, 40vw"
              className={s.foto} data-ativa={i === ativo ? 'sim' : 'nao'} />
          ))}
        </div>
      </div>
      <ul className={s.lista} aria-labelledby="titulo-numeros">
        {numeros.map((n, i) => (
          <li key={n.legenda} data-entra style={{ '--ordem': i } as React.CSSProperties}>
            <button type="button" className={s.linha} data-ativa={i === ativo ? 'sim' : 'nao'}
              onMouseEnter={() => setAtivo(i)} onFocus={() => setAtivo(i)} onClick={() => setAtivo(i)}
              aria-pressed={i === ativo}>
              <span className={s.inteiro}>{n.inteiro}</span>
              <span className={s.decimal}>{n.decimal}</span>
              <span className={s.legenda}>{n.legenda}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
