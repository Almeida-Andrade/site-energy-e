'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import s from './Numeros.module.css'

export interface Numero {
  valor: string
  unidade: string
  legenda: string
  foto: StaticImageData
  alt: string
}

// O porte das usinas em quatro quadros. Apontar (ou tocar) um número mostra no quadro ao lado a foto que ele descreve.
export function Numeros({ numeros }: { numeros: Numero[] }) {
  const [ativo, setAtivo] = useState(0)
  return (
    <div className={s.numeros}>
      <div className={s.cabeca}>
        <h2 id="titulo-numeros" className={s.titulo} data-entra>Quatro usinas, um só sol</h2>
        <p className={s.fonte} data-entra style={{ '--ordem': 1 } as React.CSSProperties}>
          O porte do projeto, somado das Canis 1, 2, 3 e 5. As quatro usinas têm o mesmo tamanho.
        </p>
      </div>
      <div className={s.quadro} data-entra>
        {numeros.map((n, i) => (
          <Image key={n.legenda} src={n.foto} alt={i === ativo ? n.alt : ''} fill sizes="(max-width: 760px) 100vw, 40vw"
            className={s.foto} data-ativa={i === ativo ? 'sim' : 'nao'} />
        ))}
      </div>
      <ul className={s.grade} aria-labelledby="titulo-numeros">
        {numeros.map((n, i) => (
          <li key={n.legenda} data-entra style={{ '--ordem': i } as React.CSSProperties}>
            <button type="button" className={s.celula} data-ativa={i === ativo ? 'sim' : 'nao'}
              onMouseEnter={() => setAtivo(i)} onFocus={() => setAtivo(i)} onClick={() => setAtivo(i)}
              aria-pressed={i === ativo}>
              <span className={s.valor}>
                {n.valor}
                {n.unidade && <span className={s.unidade}>{n.unidade}</span>}
              </span>
              <span className={s.legenda}>{n.legenda}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
