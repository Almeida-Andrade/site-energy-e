'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import logo from '@/public/marca/energy-e.png'
import s from './BarraPastas.module.css'

// No celular, as pastas da primeira tela saem de vista logo no começo. Esta barra entra no lugar delas:
// aparece quando a capa sai da tela, com as mesmas abas coloridas, e marca a seção em que o leitor está.
const SECOES = [
  { id: 'numeros', rotulo: 'Números', cor: 'var(--verde)', tinta: 'var(--tinta)' },
  { id: 'usinas', rotulo: 'Usinas', cor: 'var(--ciano)', tinta: 'var(--tinta)' },
  { id: 'obra', rotulo: 'A obra', cor: 'var(--limao)', tinta: 'var(--tinta)' },
  { id: 'sol', rotulo: 'O sol agora', cor: 'var(--noite)', tinta: 'var(--papel)' },
  { id: 'contato', rotulo: 'Contato', cor: 'var(--marinho)', tinta: 'var(--papel)' },
]

export function BarraPastas() {
  const [visivel, setVisivel] = useState(false)
  const [ativa, setAtiva] = useState<string | null>(null)
  const abas = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const capa = document.getElementById('inicio')
    const obsCapa = new IntersectionObserver(([e]) => setVisivel(!e.isIntersecting), { threshold: 0 })
    if (capa) obsCapa.observe(capa)

    const obsSecao = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    SECOES.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) obsSecao.observe(el)
    })
    return () => {
      obsCapa.disconnect()
      obsSecao.disconnect()
    }
  }, [])

  // A aba ativa rola para dentro da barra, sem mexer na página
  useEffect(() => {
    const lista = abas.current
    const aba = lista?.querySelector<HTMLElement>(`[data-id="${ativa}"]`)
    if (lista && aba) lista.scrollTo({ left: aba.offsetLeft - 8, behavior: 'smooth' })
  }, [ativa])

  return (
    <nav className={s.barra} data-visivel={visivel ? 'sim' : 'nao'} aria-label="Seções" aria-hidden={!visivel}>
      <a href="#inicio" className={s.marca} aria-label="Energy-E, voltar ao início" tabIndex={visivel ? 0 : -1}>
        <Image src={logo} alt="" sizes="96px" className={s.logo} />
      </a>
      <ul ref={abas} className={s.abas}>
        {SECOES.map((sec) => (
          <li key={sec.id}>
            <a href={`#${sec.id}`} data-id={sec.id} data-ativa={ativa === sec.id ? 'sim' : 'nao'} tabIndex={visivel ? 0 : -1}
              aria-current={ativa === sec.id ? 'location' : undefined}
              style={{ '--cor': sec.cor, '--tinta-aba': sec.tinta } as React.CSSProperties}>
              {sec.rotulo}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
