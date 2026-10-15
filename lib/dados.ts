export const URL_SITE = process.env.NEXT_PUBLIC_URL_SITE
  ? process.env.NEXT_PUBLIC_URL_SITE
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:3000'

// O site é institucional. O dono pediu para não expor nada da operação:
// nada de contratos, parceiros, geração mensal, coordenadas exatas, marcas de equipamento ou sócios.

// Pontos aproximados (centro de cada conjunto), usados só para calcular o sol no navegador; não aparecem na página.
export const LOCAIS = {
  pindare: { nome: 'Pindaré-Mirim', lat: -3.756, lon: -45.451 },
  santaInes: { nome: 'Santa Inês', lat: -3.714, lon: -45.415 },
} as const

export const USINAS = [
  { nome: 'Canis 1', local: LOCAIS.pindare },
  { nome: 'Canis 2', local: LOCAIS.pindare },
  { nome: 'Canis 3', local: LOCAIS.pindare },
  { nome: 'Canis 5', local: LOCAIS.santaInes },
]

// Números de projeto (ART da obra). Só o porte; nada de operação ou dinheiro.
export const NUMEROS = [
  { inteiro: '4', decimal: '', legenda: 'usinas solares em operação', foto: 'canis123-obliqua' },
  { inteiro: '6', decimal: ',0', legenda: 'MWp de potência instalada', foto: 'canis5-de-cima' },
  { inteiro: '4', decimal: ',0', legenda: 'MW de conexão com a rede', foto: 'cabines' },
  { inteiro: '8.640', decimal: '', legenda: 'painéis solares no projeto', foto: 'fileiras' },
  { inteiro: '7', decimal: ',2', legenda: 'hectares de usinas, 1,8 por usina', foto: 'canis123-br222' },
] as const

export const GRUPO = {
  nome: 'Grupo Almeida Andrade',
  url: 'https://grupoaandrade.com.br',
  endereco: 'Av. dos Sambaquis, 33 — Ed. Galeria A',
  bairro: 'Calhau, São Luís — MA',
  mapa: 'https://maps.app.goo.gl/eQFgEmat3vfh1Wz97',
  exclusiva: 'https://exclusiva.grupoaandrade.com.br',
}
