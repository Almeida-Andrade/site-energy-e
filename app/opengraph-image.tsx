import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Energy-E — energia solar no interior do Maranhão'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Imagem() {
  const foto = await readFile(join(process.cwd(), 'public/fotos/canis5-de-cima.jpg'))
  const logo = await readFile(join(process.cwd(), 'public/logo-energy-e.png'))
  const src = (b: Buffer, t: string) => `data:${t};base64,${b.toString('base64')}`
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#10132A', padding: 32, gap: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 460, background: '#FFFFFF', padding: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src(logo, 'image/png')} width={380} height={134} alt="" />
          <div style={{ fontSize: 34, color: '#161A30', lineHeight: 1.2 }}>Quatro usinas solares às margens da BR-222, no Maranhão</div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src(foto, 'image/jpeg')} width={644} height={566} alt="" style={{ objectFit: 'cover' }} />
      </div>
    ),
    size,
  )
}
