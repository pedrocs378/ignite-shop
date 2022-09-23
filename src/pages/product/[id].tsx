import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'

import { stripe } from '../../lib/stripe'

import * as S from '../../styles/pages/product'

type Params = {
  id: string
}

type ProductProps = {
  product: {
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} alt={product.name} width={520} height={480} />
      </S.ImageContainer>

      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
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
    price: new Intl.NumberFormat('pt-BR', {
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
