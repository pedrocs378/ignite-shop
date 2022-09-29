import { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import { CartProvider } from '../contexts/cart-context'

import { Header } from '../components/header'

import { globalStyles } from '../styles/global'

import * as S from '../styles/pages/app'

import 'react-modern-drawer/dist/index.css'

globalStyles()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />

      <S.Container>
        <CartProvider>
          <Header />

          <Component {...pageProps} />
        </CartProvider>
      </S.Container>
    </>
  )
}

export default MyApp
