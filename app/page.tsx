import Image from 'next/image'
import { BarraPastas } from '@/components/BarraPastas'
import { Entradas } from '@/components/Entradas'
import { Linha, type Momento } from '@/components/Linha'
import { Numeros, type Numero } from '@/components/Numeros'
import { TirasDoSol } from '@/components/Sol'
import { CONTATO, GRUPO, NUMEROS } from '@/lib/dados'
import logo from '@/public/marca/energy-e.png'
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
  cabines: { foto: cabines, alt: 'As cabines de medição e proteção das usinas, ao lado da estrada' },
  fileiras: { foto: fileiras, alt: 'Fileiras de painéis solares vistas de perto, do alto' },
  'canis123-br222': { foto: canis123Br222, alt: 'As usinas Canis 1, 2 e 3 na paisagem, com lagoas e a BR-222 ao lado' },
} as const

const NUMEROS_COM_FOTO: Numero[] = NUMEROS.map((n) => ({ ...n, ...FOTOS[n.foto] }))

// Pastas da primeira tela: cada uma leva à sua seção. A da frente é a aberta.
const PASTAS = [
  { rotulo: 'O sol agora', href: '#sol', cor: 'var(--noite)', tinta: 'var(--papel)', aba: '62%' },
  { rotulo: 'A obra', href: '#obra', cor: 'var(--limao)', tinta: 'var(--tinta)', aba: '44%' },
  { rotulo: 'As usinas', href: '#usinas', cor: 'var(--ciano)', tinta: 'var(--tinta)', aba: '26%' },
  { rotulo: 'Em números', href: '#numeros', cor: 'var(--verde)', tinta: 'var(--tinta)', aba: '8%' },
]

const USINAS_PASTAS = [
  {
    id: 'canis-1-2-3',
    nome: 'Canis 1, 2 e 3',
    lugar: 'Pindaré-Mirim, MA',
    cor: 'var(--verde)',
    aba: 'var(--marinho)',
    abaTinta: 'var(--papel)',
    foto: canis123Obliqua,
    alt: 'As usinas Canis 1, 2 e 3 vistas do alto: três blocos de fileiras de painéis, com a mata ao fundo',
    texto:
      'Três usinas vizinhas no Povoado Lago Verde, às margens da BR-222. Cada uma ocupa 1,8 hectare e tem a sua própria cabine de medição e proteção, ligada à rede de média tensão. Vistas do alto, são três blocos de fileiras paralelas no meio do campo, com o babaçual em volta.',
    sol: 'Pindaré-Mirim',
  },
  {
    id: 'canis-5',
    nome: 'Canis 5',
    lugar: 'Santa Inês, MA',
    cor: 'var(--ciano)',
    aba: 'var(--papel)',
    abaTinta: 'var(--tinta)',
    foto: canis5Vertical,
    alt: 'A usina Canis 5 vista de cima: fileiras na diagonal dentro do terreno cercado, entre o pasto e a mata',
    texto:
      'Na zona rural de Santa Inês, também à beira da BR-222. Vista de cima, a Canis 5 desenha um triângulo de fileiras na diagonal dentro do terreno cercado, com a cabine de medição num canto. Como as outras três, ocupa 1,8 hectare e foi ligada à rede em agosto de 2025.',
    sol: 'Santa Inês',
  },
  {
    id: 'paisagem',
    nome: 'A paisagem',
    lugar: 'Vale do Pindaré, BR-222',
    cor: 'var(--limao)',
    aba: 'var(--tinta)',
    abaTinta: 'var(--papel)',
    foto: canis123Br222,
    alt: 'Vista aérea ampla: as usinas Canis 1, 2 e 3 entre campos e lagoas, com a BR-222 cortando a paisagem',
    texto:
      'Campo aberto, lagoas e a reta da BR-222. As quatro usinas ficam no caminho entre Pindaré-Mirim e Santa Inês, a 3,7 graus ao sul do Equador. Ali o sol passa quase a pino perto do meio-dia e o dia tem perto de doze horas de luz em qualquer época do ano.',
    sol: 'Pindaré-Mirim',
  },
]

// Só fotos do levantamento aéreo da obra, com a data gravada pelo drone (EXIF), e os dois marcos documentados
// depois (usinas ligadas a partir de 25/08/2025, operação a partir de 01/09/2025). As legendas dizem o que se vê.
const MOMENTOS: Momento[] = [
  { data: '23 de abril de 2025', texto: 'Canis 5. As fileiras já têm painéis; num canto, estruturas ainda vazias.', foto: obra0423, alt: 'Obra da Canis 5 vista de cima em 23 de abril de 2025: fileiras de painéis na diagonal e estruturas vazias num canto' },
  { data: '24 de abril de 2025', texto: 'Canis 1, 2 e 3. Entre os blocos prontos, fileiras de estruturas esperam os painéis.', foto: obra0424, alt: 'Obra das Canis 1, 2 e 3 em 24 de abril de 2025: blocos com painéis e fileiras de estruturas vazias no meio' },
  { data: '28 de abril de 2025', texto: 'Canis 1, 2 e 3. Na beira da mata, poucas estruturas ainda sem painel.', foto: obra0428, alt: 'Obra das Canis 1, 2 e 3 em 28 de abril de 2025, junto à mata, com algumas estruturas vazias' },
  { data: '30 de abril de 2025', texto: 'Canis 1, 2 e 3. Quase todas as fileiras já cobertas de painéis.', foto: obra0430, alt: 'Obra das Canis 1, 2 e 3 em 30 de abril de 2025: fileiras quase todas com painéis' },
  { data: '16 de maio de 2025', texto: 'Canis 1, 2 e 3. Alguns painéis ainda soltos ao lado das fileiras.', foto: obra0516, alt: 'Obra das Canis 1, 2 e 3 em 16 de maio de 2025, com alguns painéis soltos ao lado das fileiras' },
  { data: '20 de maio de 2025', texto: 'Canis 1, 2 e 3. Restam poucos painéis fora do lugar.', foto: obra0520, alt: 'Obra das Canis 1, 2 e 3 em 20 de maio de 2025, com as fileiras quase completas' },
  { data: '25 de agosto de 2025', texto: 'As quatro usinas começam a ser ligadas à rede elétrica.', marco: 'Ligadas à rede', cor: 'var(--verde)', tinta: 'var(--tinta)' },
  { data: '1º de setembro de 2025', texto: 'As Canis 1, 2, 3 e 5 entram em operação.', marco: 'Em operação', cor: 'var(--marinho)', tinta: 'var(--papel)' },
]

export default function Pagina() {
  return (
    <>
      <Entradas />
      <BarraPastas />

      {/* Primeira tela: o logo e a pilha de pastas de projeto */}
      <header className={s.capa} id="inicio">
        <nav className={s.topo} aria-label="Atalhos">
          <a href="#contato">Contato</a>
          <a href={GRUPO.url}>Grupo Almeida Andrade</a>
        </nav>

        <h1 className={s.titulo} data-entra>
          <Image src={logo} alt="Energy-E Renovável" priority sizes="(max-width: 760px) 86vw, 640px" className={s.logo} />
        </h1>
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
              fill priority sizes="92vw" className={s.capaFoto} />
          </div>
        </nav>
      </header>

      <main>
        {/* Apresentação: o texto e os fatos de um lado, a foto do outro */}
        <section className={s.intro} aria-labelledby="titulo-intro">
          <div className={s.introTexto}>
            <h2 id="titulo-intro" className={s.introTitulo} data-entra>Sol que vira energia</h2>
            <p className={s.introNota} data-entra style={ordem(1)}>
              A Energy-E é a empresa de energia renovável do Grupo Almeida Andrade. Suas quatro usinas solares,
              as Canis, ficam no interior do Maranhão e entraram em operação em 2025.
            </p>
            <dl className={s.fatos}>
              <div data-entra style={ordem(0)}><dt>4 usinas</dt><dd>Canis 1, 2, 3 e 5</dd></div>
              <div data-entra style={ordem(1)}><dt>BR-222</dt><dd>entre Pindaré-Mirim e Santa Inês</dd></div>
              <div data-entra style={ordem(2)}><dt>2025</dt><dd>o ano em que entraram em operação</dd></div>
              <div data-entra style={ordem(3)}><dt>3,7° S</dt><dd>perto do Equador, sol forte o ano todo</dd></div>
            </dl>
          </div>
          <figure className={s.introFoto} data-entra style={ordem(2)}>
            <Image src={fileiras} alt="Fileiras de painéis solares das usinas Canis vistas do alto" fill
              sizes="(max-width: 760px) 100vw, 50vw" />
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
              </div>
              <div className={s.faixaCorpo}>
                <div className={s.faixaFoto}>
                  <Image src={u.foto} alt={u.alt} fill loading="eager" sizes="(max-width: 760px) 100vw, 56vw" />
                </div>
                <div className={s.faixaTexto} data-entra style={ordem(1)}>
                  <p className={s.faixaLugar}>{u.lugar}</p>
                  <p>{u.texto}</p>
                  <a href="#sol" className={s.faixaLink}>Ver o sol agora em {u.sol}</a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* A obra */}
        <section id="obra" className={s.obra}>
          <Linha
            titulo="A obra vista do drone"
            apoio="Fotos do levantamento aéreo de abril e maio de 2025, cada uma com a data em que foi tirada. Depois, os dois marcos que vieram com as usinas prontas."
            momentos={MOMENTOS}
          />
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
            <p>Pela hora do seu aparelho: a altura do sol sobre as usinas neste minuto, o nascer e o pôr de hoje.</p>
          </div>
          <div className={s.solTiras}>
            <TirasDoSol />
          </div>
        </section>
      </main>

      {/* O verso do cartão */}
      <footer className={s.verso} id="contato">
        <div className={s.cartao}>
          <div className={s.cartaoMensagem} data-entra>
            <Image src={logo} alt="Energy-E Renovável" sizes="240px" className={s.cartaoLogo} />
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
            <h2 className={s.cartaoTitulo}>Fale com a gente</h2>
            <ul className={s.contatos}>
              <li><a href={CONTATO.whatsappUrl} target="_blank" rel="noopener">WhatsApp {CONTATO.whatsapp}</a></li>
              <li>
                <a href={`mailto:${CONTATO.email}`} className={s.email}>
                  {CONTATO.email.replace(/@.*/, '')}@<wbr />{CONTATO.email.replace(/.*@/, '')}
                </a>
              </li>
            </ul>
            <ul className={s.enderecos}>
              <li><a href={GRUPO.mapa} target="_blank" rel="noopener">{GRUPO.endereco}<br />{GRUPO.bairro}</a></li>
              <li><a href={GRUPO.url}>grupoaandrade.com.br</a></li>
              <li><a href={GRUPO.exclusiva}>Exclusiva Engenharia</a></li>
            </ul>
          </div>
          <p className={s.imprenta}>© 2026 Energy-E · {GRUPO.nome}</p>
        </div>
      </footer>
    </>
  )
}
