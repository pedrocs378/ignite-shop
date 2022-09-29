import { useReducer, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag, SmileySad, X } from 'phosphor-react'
import ClockLoader from 'react-spinners/ClockLoader'
import axios from 'axios'

import { useCart } from '../../contexts/cart-context'

import logoImg from '../../assets/logo.svg'

import { Drawer } from '../drawer'

import * as S from './styles'

export function Header() {
  const [isOpen, toggleDrawerOpen] = useReducer((state) => !state, false)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const {
    itemsQuantity,
    totalCartValue,
    cartItems,
    removeItemFromCart
  } = useCart()


  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const priceIds = cartItems.map((cartItem) => cartItem.defaultPriceId)

      const response = await axios.post('/api/checkout', {
        priceIds
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
      <S.HeaderContainer>
        <Link href="/" prefetch={false}>
          <a>
            <Image src={logoImg.src} alt="" width={logoImg.width} height={logoImg.height} />
          </a>
        </Link>

        <button
          type="button"
          title="Carrinho"
          onClick={toggleDrawerOpen}
        >
          <Handbag size={24} weight="bold" color="#8D8D99" />

          {itemsQuantity > 0 && (
            <span>{itemsQuantity}</span>
          )}
        </button>
      </S.HeaderContainer>

      <Drawer
        direction="right"
        size={480}
        open={isOpen}
        onClose={toggleDrawerOpen}
      >
        <S.CartHeader>
          <button
            type="button"
            title="Fechar carrinho"
            onClick={toggleDrawerOpen}
          >
            <X weight="bold" color="#8D8D99" size={24} />
          </button>
        </S.CartHeader>

        <S.CartContent>
          <strong>Sacola de compras</strong>

          {!cartItems.length ? (
            <S.EmptyCart>
              <span>Carrinho vazio</span>

              <SmileySad size={32} />
            </S.EmptyCart>
          ) : (
            <S.CartList>
              {cartItems.map((cartItem) => {
                return (
                  <S.CartItem key={cartItem.id}>
                    <S.ImageContainer>
                      <Image
                        src={cartItem.imageUrl}
                        alt={cartItem.name}
                        width={94}
                        height={94}
                      />
                    </S.ImageContainer>

                    <S.CartItemDetails>
                      <p>{cartItem.name}</p>
                      <strong>{cartItem.formattedPrice}</strong>

                      <button
                        type="button"
                        onClick={() => removeItemFromCart(cartItem.id)}
                      >
                        Remover
                      </button>
                    </S.CartItemDetails>
                  </S.CartItem>
                )
              })}
            </S.CartList>
          )}
        </S.CartContent>

        <S.CartFooter>
          <S.CartInfoContainer>
            <S.InfoRow>
              <span>Quantidade</span>
              <span>{itemsQuantity} {itemsQuantity === 1 ? 'item' : 'itens'}</span>
            </S.InfoRow>

            <S.InfoRow>
              <b>Valor total</b>
              <strong>{totalCartValue.label}</strong>
            </S.InfoRow>
          </S.CartInfoContainer>

          <button
            type="button"
            disabled={itemsQuantity === 0 || isCreatingCheckoutSession}
            onClick={handleBuyProduct}
          >
            {isCreatingCheckoutSession ? <ClockLoader color="white" size={15} /> : 'Finalizar compra' }
          </button>
        </S.CartFooter>
      </Drawer>
    </>
  )
}
