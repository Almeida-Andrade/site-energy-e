import Image from 'next/image'
import { Entradas } from '@/components/Entradas'
import { Globo } from '@/components/Globo'
import { Linha, type Momento } from '@/components/Linha'
import { Numeros, type Numero } from '@/components/Numeros'
import { TirasDoSol } from '@/components/Sol'
import { GRUPO, NUMEROS } from '@/lib/dados'
import canis5DeCima from '@/public/fotos/canis5-de-cima.jpg'
import canis5Obliqua from '@/public/fotos/canis5-obliqua.jpg'
import canis5Vertical from '@/public/fotos/canis5-vertical.jpg'
import canis123Obliqua from '@/public/fotos/canis123-obliqua.jpg'
import canis123Br222 from '@/public/fotos/canis123-br222.jpg'
import cabines from '@/public/fotos/cabines.jpg'
import fileiras from '@/public/fotos/fileiras.jpg'
import obra0423 from '@/public/fotos/obra/2025-04-23-canis5.jpg'
import obra0424 from '@/public/fotos/obra/2025-04-24-canis123.jpg'
import obra0428 from '@/public/fotos/obra/2025-04-28-canis123.jpg'
import obra0430 from '@/public/fotos/obra/2025-04-30-canis123.jpg'
import obra0516 from '@/public/fotos/obra/2025-05-16-canis123.jpg'
import obra0520 from '@/public/fotos/obra/2025-05-20-canis123.jpg'
import s from './page.module.css'

const ordem = (n: number) => ({ '--ordem': n }) as React.CSSProperties

const FOTOS = {
  'canis5-de-cima': { foto: canis5DeCima, alt: 'A usina Canis 5 vista de cima: fileiras de painéis na diagonal dentro do terreno cercado' },
  'canis123-obliqua': { foto: canis123Obliqua, alt: 'As usinas Canis 1, 2 e 3 lado a lado, vistas do alto, com a mata ao fundo' },
  cabines: { foto: cabines, alt: 'As cabines de medição e proteção das usinas, ao lado da estrada' },
  fileiras: { foto: fileiras, alt: 'Fileiras de painéis solares vistas de perto, do alto' },
  'canis123-br222': { foto: canis123Br222, alt: 'As usinas Canis 1, 2 e 3 na paisagem, com lagoas e a BR-222 ao lado' },
} as const

const NUMEROS_COM_FOTO: Numero[] = NUMEROS.map((n) => ({ ...n, ...FOTOS[n.foto] }))

// Pastas da primeira tela: cada uma leva à sua seção. A da frente é a aberta.
const PASTAS = [
  { rotulo: 'O sol agora', href: '#sol', cor: 'var(--papel)', tinta: 'var(--tinta)', aba: '62%' },
  { rotulo: 'A obra', href: '#obra', cor: 'var(--limao)', tinta: 'var(--tinta)', aba: '44%' },
  { rotulo: 'As usinas', href: '#usinas', cor: 'var(--ciano)', tinta: 'var(--tinta)', aba: '26%' },
  { rotulo: 'Em números', href: '#numeros', cor: 'var(--verde)', tinta: 'var(--tinta)', aba: '8%' },
]

const USINAS_PASTAS = [
  {
    id: 'canis-1-2-3',
    nome: 'Canis 1, 2 e 3',
    lugar: 'Pindaré-Mirim',
    cor: 'var(--verde)',
    aba: 'var(--marinho)',
    abaTinta: 'var(--papel)',
    foto: canis123Obliqua,
    alt: 'As usinas Canis 1, 2 e 3 vistas do alto: três blocos de fileiras de painéis, com a mata ao fundo',
    texto:
      'Três usinas vizinhas no Povoado Lago Verde, em Pindaré-Mirim, às margens da BR-222. Cada uma ocupa 1,8 hectare e tem a sua própria cabine de medição e proteção, ligada à rede de média tensão. Vistas do alto, são três blocos de fileiras paralelas no meio do campo, com o babaçual em volta.',
  },
  {
    id: 'canis-5',
    nome: 'Canis 5',
    lugar: 'Santa Inês',
    cor: 'var(--ciano)',
    aba: 'var(--papel)',
    abaTinta: 'var(--tinta)',
    foto: canis5Vertical,
    alt: 'A usina Canis 5 vista de cima: fileiras na diagonal dentro do terreno cercado, entre o pasto e a mata',
    texto:
      'Na zona rural de Santa Inês, também à beira da BR-222. Vista de cima, a Canis 5 desenha um triângulo de fileiras na diagonal dentro do terreno cercado, com a cabine de medição num canto. Como as outras três, ocupa 1,8 hectare e foi ligada à rede em agosto de 2025.',
  },
  {
    id: 'paisagem',
    nome: 'A paisagem',
    lugar: 'BR-222',
    cor: 'var(--limao)',
    aba: 'var(--tinta)',
    abaTinta: 'var(--papel)',
    foto: canis123Br222,
    alt: 'Vista aérea ampla: as usinas Canis 1, 2 e 3 entre campos e lagoas, com a BR-222 cortando a paisagem',
    texto:
      'Campo aberto, lagoas e a reta da BR-222. As quatro usinas ficam no caminho entre Pindaré-Mirim e Santa Inês, no Vale do Pindaré, a 3,7 graus ao sul do Equador. Ali o sol passa quase a pino perto do meio-dia e o dia tem perto de doze horas de luz em qualquer época do ano.',
  },
]

const MOMENTOS: Momento[] = [
  { titulo: '23 de abril de 2025', texto: 'A Canis 5, em Santa Inês, vista do drone com as fileiras subindo pelo terreno.', foto: obra0423, alt: 'Obra da Canis 5 em 23 de abril de 2025, vista de cima' },
  { titulo: '24 de abril', texto: 'Nas Canis 1, 2 e 3, as estruturas avançam pelos três blocos.', foto: obra0424, alt: 'Obra das Canis 1, 2 e 3 em 24 de abril de 2025' },
  { titulo: '28 de abril', texto: 'Os painéis cobrem as primeiras fileiras de cada bloco.', foto: obra0428, alt: 'Obra das Canis 1, 2 e 3 em 28 de abril de 2025' },
  { titulo: '30 de abril', texto: 'Mais fileiras completas e as estruturas vazias ficando para trás.', foto: obra0430, alt: 'Obra das Canis 1, 2 e 3 em 30 de abril de 2025' },
  { titulo: '16 de maio', texto: 'Os três blocos quase completos vistos do alto.', foto: obra0516, alt: 'Obra das Canis 1, 2 e 3 em 16 de maio de 2025' },
  { titulo: '20 de maio', texto: 'Os últimos painéis das Canis 1, 2 e 3 chegam às estruturas.', foto: obra0520, alt: 'Obra das Canis 1, 2 e 3 em 20 de maio de 2025' },
  { titulo: 'As cabines', texto: 'Uma cabine de medição e proteção para cada usina, à beira da estrada.', foto: cabines, alt: 'Cabines de medição e proteção das usinas' },
  { titulo: 'Agosto de 2025', texto: 'As quatro usinas são ligadas à rede elétrica.', foto: canis5DeCima, alt: 'A Canis 5 pronta, vista de cima' },
  { titulo: 'Setembro de 2025', texto: 'As Canis 1, 2, 3 e 5 em operação, todas prontas.', foto: canis123Obliqua, alt: 'As Canis 1, 2 e 3 prontas, vistas do alto' },
]

export default function Pagina() {
  return (
    <>
      <Entradas />

      {/* Primeira tela: a pilha de pastas de projeto */}
      <header className={s.capa} id="inicio">
        <div className={s.topo}>
          <span aria-hidden="true" />
          <a href="#inicio" className={s.marca} aria-label="Energy-E, início">
            <Globo className={s.globo} fundo="var(--noite)" />
            <span>energy-e</span>
          </a>
          <a href={GRUPO.url} className={s.linkGrupo}>Grupo Almeida Andrade</a>
        </div>

        <h1 className={s.titulo} data-entra>energy-e</h1>
        <p className={s.apoio} data-entra style={ordem(1)}>
          Energia solar gerada em quatro usinas às margens da <span className={s.junto}>BR-222</span>, no interior do Maranhão.
        </p>

        <nav className={s.pastas} aria-label="Seções">
          {PASTAS.map((p, i) => (
            <a key={p.href} href={p.href} className={s.pasta}
              style={{ '--cor': p.cor, '--tinta-pasta': p.tinta, '--aba': p.aba, '--i': i } as React.CSSProperties}>
              <span className={s.aba}>{p.rotulo}</span>
            </a>
          ))}
          <div className={`${s.pasta} ${s.pastaAberta}`} style={{ '--i': PASTAS.length, '--aba': '80%' } as React.CSSProperties}>
            <span className={s.aba}>Canis 5, Santa Inês</span>
            <a href="#usinas" className={s.botao}>Conhecer as usinas</a>
            <Image src={canis5DeCima} alt="A usina Canis 5 vista de cima, com as fileiras de painéis na diagonal"
              fill priority sizes="86vw" className={s.capaFoto} />
          </div>
        </nav>
      </header>

      <main>
        {/* Apresentação */}
        <section className={s.intro} aria-labelledby="titulo-intro">
          <div className={s.introTopo}>
            <h2 id="titulo-intro" className={s.introTitulo} data-entra>Sol que vira energia</h2>
            <p className={s.introNota} data-entra style={ordem(1)}>
              A Energy-E é a empresa de energia renovável do Grupo Almeida Andrade. Suas quatro usinas solares,
              as Canis, ficam no interior do Maranhão e entraram em operação em 2025.
            </p>
          </div>
          <dl className={s.fatos}>
            <div data-entra style={ordem(0)}><dt>4 usinas</dt><dd>Canis 1, 2, 3 e 5</dd></div>
            <div data-entra style={ordem(1)}><dt>BR-222</dt><dd>entre Pindaré-Mirim e Santa Inês</dd></div>
            <div data-entra style={ordem(2)}><dt>2025</dt><dd>o ano em que entraram em operação</dd></div>
            <div data-entra style={ordem(3)}><dt>3,7° S</dt><dd>perto do Equador, sol forte o ano todo</dd></div>
          </dl>
          <figure className={s.introFoto} data-entra style={ordem(2)}>
            <Image src={fileiras} alt="Fileiras de painéis solares das usinas Canis vistas do alto" fill
              sizes="(max-width: 760px) 100vw, 42vw" />
          </figure>
        </section>

        {/* Números */}
        <section id="numeros" className={s.secaoNumeros}>
          <Numeros numeros={NUMEROS_COM_FOTO} />
        </section>

        {/* As usinas: pastas empilhadas */}
        <section id="usinas" className={s.usinas} aria-labelledby="titulo-usinas">
          <h2 id="titulo-usinas" className={s.usinasTitulo} data-entra>As usinas</h2>
          {USINAS_PASTAS.map((u, i) => (
            <article key={u.id} id={u.id} className={s.faixa}
              style={{ '--cor': u.cor, '--aba-cor': u.aba, '--aba-tinta': u.abaTinta, '--topo': `${i * 64}px` } as React.CSSProperties}>
              <div className={s.faixaCabeca}>
                <h3 className={s.faixaAba}>{u.nome}</h3>
                <p className={s.faixaLugar}>{u.lugar}</p>
              </div>
              <div className={s.faixaCorpo}>
                <div className={s.faixaFoto}>
                  <Image src={u.foto} alt={u.alt} fill loading="eager" sizes="(max-width: 760px) 100vw, 56vw" />
                </div>
                <div className={s.faixaTexto} data-entra style={ordem(1)}>
                  <p>{u.texto}</p>
                  <a href="#sol" className={s.faixaLink}>Ver o sol agora em {u.lugar === 'BR-222' ? 'Pindaré-Mirim' : u.lugar}</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* A obra */}
        <section id="obra" className={s.obra}>
          <Linha titulo="A obra, foto a foto" momentos={MOMENTOS} />
          <p className={s.obraNota} data-entra>
            As usinas foram construídas pela <a href={GRUPO.exclusiva}>Exclusiva Engenharia</a>, a construtora do grupo.
          </p>
        </section>

        {/* O sol agora */}
        <section id="sol" className={s.sol} aria-labelledby="titulo-sol">
          <div className={s.solFoto}>
            <Image src={canis5Obliqua} alt="A usina Canis 5 vista do alto, em ângulo, com a cabine de medição e o pasto em volta"
              fill sizes="100vw" />
          </div>
          <div className={s.solTexto} data-entra>
            <h2 id="titulo-sol">O sol agora</h2>
            <p>sobre as usinas. Elas ficam a 3,7 graus ao sul do Equador, onde o dia tem perto de doze horas de luz o ano inteiro.</p>
            <p>As tiras mostram, pela hora do seu aparelho, a altura do sol sobre cada usina e o nascer e o pôr de hoje.</p>
          </div>
          <TirasDoSol />
        </section>
      </main>

      {/* O verso do cartão */}
      <footer className={s.verso}>
        <div className={s.cartao}>
          <div className={s.cartaoMensagem} data-entra>
            <p className={s.cartaoAssinatura}>Energia que só cresce</p>
            <p>
              A Energy-E é uma empresa do Grupo Almeida Andrade, de São Luís. As usinas Canis foram construídas
              pela Exclusiva Engenharia, também do grupo.
            </p>
          </div>
          <div className={s.cartaoEndereco} data-entra style={ordem(1)}>
            <div className={s.selo}>
              <Image src={canis5DeCima} alt="" fill sizes="88px" />
            </div>
            <ul>
              <li><a href={GRUPO.url}>grupoaandrade.com.br</a></li>
              <li><a href={GRUPO.mapa} target="_blank" rel="noopener">{GRUPO.endereco}</a></li>
              <li><a href={GRUPO.mapa} target="_blank" rel="noopener">{GRUPO.bairro}</a></li>
              <li><a href={GRUPO.exclusiva}>Exclusiva Engenharia</a></li>
            </ul>
          </div>
          <p className={s.imprenta}>© 2026 Energy-E · {GRUPO.nome}</p>
        </div>
      </footer>
    </>
  )
}
