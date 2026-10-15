'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import logo from '@/public/marca/energy-e.png'
import s from './BarraPastas.module.css'

// Só no celular. Quando as pastas da capa saem de vista, entra este topo fixo:
// o logo, uma aba que diz em que seção o leitor está (sempre à vista) e o Menu,
// que abre as seções como uma pilha de pastas nas cores da capa.
const SECOES = [
  { id: 'sobre', rotulo: 'A Energy-E', cor: 'var(--papel-2)', tinta: 'var(--tinta)' },
  { id: 'numeros', rotulo: 'Em números', cor: 'var(--verde)', tinta: 'var(--tinta)' },
  { id: 'usinas', rotulo: 'As usinas', cor: 'var(--ciano)', tinta: 'var(--tinta)' },
  { id: 'obra', rotulo: 'A obra', cor: 'var(--limao)', tinta: 'var(--tinta)' },
  { id: 'sol', rotulo: 'O sol agora', cor: 'var(--noite)', tinta: 'var(--papel)' },
  { id: 'contato', rotulo: 'Contato', cor: 'var(--marinho)', tinta: 'var(--papel)' },
]

export function BarraPastas() {
  const [visivel, setVisivel] = useState(false)
  const [ativa, setAtiva] = useState<string | null>(null)
  const menu = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    // A seção atual é a última cujo topo já passou de 35% da altura da tela, medida a cada rolagem:
    // nada de faixa no meio da tela que deixa buracos entre uma seção e outra.
    let quadro = 0
    const mede = () => {
      quadro = 0
      const capa = document.getElementById('inicio')
      setVisivel(capa ? capa.getBoundingClientRect().bottom < 0 : true)
      const linha = innerHeight * 0.35
      let atual: string | null = null
      for (const sec of SECOES) {
        const el = document.getElementById(sec.id)
        if (el && el.getBoundingClientRect().top <= linha) atual = sec.id
      }
      setAtiva(atual)
    }
    const agenda = () => { if (!quadro) quadro = requestAnimationFrame(mede) }
    mede()
    addEventListener('scroll', agenda, { passive: true })
    addEventListener('resize', agenda)
    const fechaComEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') menu.current?.removeAttribute('open') }
    addEventListener('keydown', fechaComEsc)
    return () => {
      removeEventListener('scroll', agenda)
      removeEventListener('resize', agenda)
      removeEventListener('keydown', fechaComEsc)
      cancelAnimationFrame(quadro)
    }
  }, [])

  // Se a barra some (voltou para a capa), o menu fecha junto
  useEffect(() => { if (!visivel) menu.current?.removeAttribute('open') }, [visivel])

  const atual = SECOES.find((sec) => sec.id === ativa) ?? SECOES[0]

  return (
    <div className={s.barra} data-visivel={visivel ? 'sim' : 'nao'} inert={!visivel}>
      <a href="#inicio" className={s.marca} aria-label="Energy-E, voltar ao início">
        <Image src={logo} alt="" sizes="96px" className={s.logo} />
      </a>

      {/* A aba da seção atual, na cor da pasta dela */}
      <p className={s.atual} aria-live="polite" style={{ '--cor': atual.cor, '--tinta-aba': atual.tinta } as React.CSSProperties}>
        <span className="sr-only">Você está em: </span>
        {atual.rotulo}
      </p>

      <details ref={menu} className={s.menu}>
        <summary className={s.menuBotao}>Menu</summary>
        <nav aria-label="Seções" className={s.pilha}>
          {SECOES.map((sec, i) => (
            <a key={sec.id} href={`#${sec.id}`} onClick={() => menu.current?.removeAttribute('open')}
              aria-current={sec.id === atual.id ? 'location' : undefined}
              style={{ '--cor': sec.cor, '--tinta-aba': sec.tinta, '--i': i } as React.CSSProperties}>
              <span>{sec.rotulo}</span>
              {sec.id === atual.id && <small>você está aqui</small>}
            </a>
          ))}
        </nav>
      </details>
    </div>
  )
}
