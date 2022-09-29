import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { destroyCookie } from 'nookies'
import Stripe from 'stripe';

import { stripe } from '../../lib/stripe';

import * as S from '../../styles/pages/success';

type SuccessProps = {
  customerName: string
  totalRemainingProducts: number
  products: {
    id: string
    name: string
    imageUrl: string
  }[]
}

export default function Success({
  customerName,
  totalRemainingProducts,
  products
}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada! | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <S.SuccessContainer>
        <S.ProductImagesContainer>
          {products.map((product, idx) => (
            <S.ImageContainer key={product.id} style={{ zIndex: idx }}>
              <Image src={product.imageUrl} alt={product.name} height={110} width={120} />
            </S.ImageContainer>
          ))}

          {totalRemainingProducts > 0 && (
            <span>+ {totalRemainingProducts}</span>
          )}
        </S.ProductImagesContainer>

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul{' '}
          <strong>{customerName}</strong>,{' '}
          sua compra de{' '}
          <strong>{products.length}</strong>{' '}
          {products.length === 1 ? 'camiseta' : 'camisetas'}{' '}
          já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </S.SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx

  if (!query.session_id) {
    return {
      props: {},
      redirect: {
        destination: '/'
      }
    }
  }

  destroyCookie(ctx, '@ignite-shop:cart')

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name

  const products = session.line_items.data.slice(0, 3).map((lineItem) => {
    const product = lineItem.price.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0]
    }
  })

  const totalRemainingProducts = session.line_items.data.length - products.length

  return {
    props: {
      customerName,
      products,
      totalRemainingProducts
    }
  }
}
