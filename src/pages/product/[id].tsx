import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import Stripe from 'stripe'
import axios from 'axios'

import { stripe } from '../../lib/stripe'

import { useCart } from '../../contexts/cart-context'

import * as S from '../../styles/pages/product'

type Params = {
  id: string
}

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: number
    formattedPrice: string
    defaultPriceId: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { addItemToCart } = useCart()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>

      <S.ProductContainer>
        <S.ImageContainer>
          <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
        </S.ImageContainer>

        <S.ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button onClick={() => addItemToCart(product)}>
            Colocar na sacola
          </button>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MQwuW56Uuo6M8V' } }
    ],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, Params> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  const normalizedProduct = {
    id: product.id,
    name: product.name,
    imageUrl: product.images[0],
    description: product.description,
    defaultPriceId: price.id,
    price: price.unit_amount / 100,
    formattedPrice: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }

  return {
    props: {
      product: normalizedProduct
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
