// O globo do logo da Energy-E redesenhado em cores chapadas: um círculo dividido em células,
// como um módulo solar. As cores das células seguem as do logo oficial (sem o degradê).
const CELULAS: { d: string; cor: string }[] = [
  // faixa de cima
  { d: 'M50 4A46 46 0 0 0 20 15H80A46 46 0 0 0 50 4Z', cor: 'var(--verde)' },
  // segunda faixa
  { d: 'M20 15A46 46 0 0 0 8 30H35V15Z', cor: 'var(--verde)' },
  { d: 'M35 15H50V30H35Z', cor: 'var(--marinho)' },
  { d: 'M50 15H65V30H50Z', cor: 'var(--limao)' },
  { d: 'M65 15H80A46 46 0 0 1 92 30H65Z', cor: 'var(--verde)' },
  // faixa do meio
  { d: 'M8 30A46 46 0 0 0 4 50H35V30Z', cor: 'var(--verde)' },
  { d: 'M35 30H50V50H35Z', cor: 'var(--marinho)' },
  { d: 'M50 30H65V50H50Z', cor: 'var(--ciano)' },
  { d: 'M65 30H92A46 46 0 0 1 96 50H65Z', cor: 'var(--verde)' },
  // quarta faixa
  { d: 'M4 50A46 46 0 0 0 8 70H35V50Z', cor: 'var(--verde)' },
  { d: 'M35 50H50V70H35Z', cor: 'var(--marinho)' },
  { d: 'M50 50H65V70H50Z', cor: 'var(--verde)' },
  { d: 'M65 50H96A46 46 0 0 1 92 70H65Z', cor: 'var(--verde)' },
  // faixa de baixo
  { d: 'M8 70A46 46 0 0 0 20 85H80A46 46 0 0 0 92 70Z', cor: 'var(--verde)' },
  { d: 'M20 85A46 46 0 0 0 80 85Z', cor: 'var(--marinho)' },
]

export function Globo({ className, fundo = 'var(--papel)' }: { className?: string; fundo?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      {CELULAS.map((c, i) => <path key={i} d={c.d} fill={c.cor} />)}
      {/* As faixas claras entre as células, como no logo */}
      <g fill="none" stroke={fundo} strokeWidth="3.4">
        <path d="M20 15H80M8 30H92M4 50H96M8 70H92M20 85H80" />
        <path d="M50 4V96M35 6Q26 50 35 94M65 6Q74 50 65 94" />
      </g>
    </svg>
  )
}
