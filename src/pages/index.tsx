import { MouseEvent, useCallback } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import { useCart } from '../contexts/cart-context'

import { stripe } from '../lib/stripe'

import * as S from '../styles/pages/home'

import 'keen-slider/keen-slider.min.css'

type ProductData = {
  id: string
  name: string
  imageUrl: string
  defaultPriceId: string
  price: number
  formattedPrice: string
}

type HomeProps = {
  products: ProductData[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48
    },

  })

  const { addItemToCart } = useCart()

  const handleAddProductToCart = useCallback((event: MouseEvent<HTMLButtonElement>, product: ProductData) => {
    event.preventDefault()

    addItemToCart(product)
  }, [addItemToCart])

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <S.HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link key={product.id} href={`/product/${product.id}`} prefetch={false} passHref>
              <S.Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt={product.name} width={520} height={400} />

                <S.ProductFooter>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.formattedPrice}</span>
                  </div>

                  <button
                    type="button"
                    title="Adicionar ao carrinho"
                    onClick={(e) => handleAddProductToCart(e, product)}
                  >
                    <Handbag size={32} weight="bold" color="white" />
                  </button>
                </S.ProductFooter>
              </S.Product>
            </Link>
          )
        })}
      </S.HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount / 100,
      defaultPriceId: price.id,
      formattedPrice: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount / 100)
    }
  })

  return {
    revalidate: 60 * 60 * 2, // 2 hours
    props: {
      products
    },
  }
}
