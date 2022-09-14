import { AppProps } from 'next/app'
import Image from 'next/image'

import logoImg from '../assets/logo.svg'

import { globalStyles } from '../styles/global'

import * as S from '../styles/pages/app'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <S.Header>
        <Image src={logoImg.src} alt="" width={logoImg.width} height={logoImg.height} />
      </S.Header>

      <Component {...pageProps} />
    </S.Container>
  )
}

export default MyApp
