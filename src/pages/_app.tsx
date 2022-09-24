import { AppProps } from 'next/app'

import { Header } from '../components/header'

import { globalStyles } from '../styles/global'

import * as S from '../styles/pages/app'

import 'react-modern-drawer/dist/index.css'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <Header />

      <Component {...pageProps} />
    </S.Container>
  )
}

export default MyApp
