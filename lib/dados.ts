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

// As Canis 1, 2 e 3 são vizinhas: o sol sobre elas é o mesmo.
export const CONJUNTOS = [
  { nome: 'Canis 1, 2 e 3', local: LOCAIS.pindare },
  { nome: 'Canis 5', local: LOCAIS.santaInes },
]

// Números de projeto, conferidos na ART da obra e na contagem de painéis (2.160 por usina).
// Só o porte; nada de operação ou dinheiro.
export const NUMEROS = [
  { valor: '6,0', unidade: 'MWp', legenda: 'de potência instalada, 1,5 MWp em cada usina', foto: 'canis5-de-cima' },
  { valor: '4,0', unidade: 'MW', legenda: 'de conexão com a rede, 1 MW por usina', foto: 'cabines' },
  { valor: '8.640', unidade: '', legenda: 'painéis solares, 2.160 em cada usina', foto: 'fileiras' },
  { valor: '7,2', unidade: 'ha', legenda: 'de terreno, 1,8 hectare por usina', foto: 'canis123-br222' },
] as const

// O contato é o mesmo da EGI (decisão de 15/10/2026). A mensagem pronta avisa de onde a conversa veio.
export const CONTATO = {
  whatsapp: '(98) 98481-2793',
  whatsappUrl: `https://wa.me/5598984812793?text=${encodeURIComponent('Olá! Vim pelo site da Energy-E.')}`,
  email: 'egiempreendimentos@grupoaandrade.com.br',
}

export const GRUPO = {
  nome: 'Grupo Almeida Andrade',
  url: 'https://grupoaandrade.com.br',
  endereco: 'Av. dos Sambaquis, 33 — Ed. Galeria A',
  bairro: 'Calhau, São Luís — MA',
  mapa: 'https://maps.app.goo.gl/eQFgEmat3vfh1Wz97',
  exclusiva: 'https://exclusiva.grupoaandrade.com.br',
}
