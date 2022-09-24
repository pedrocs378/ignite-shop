import { useReducer } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Handbag, X } from 'phosphor-react'

import { useCart } from '../../contexts/cart-context'

import logoImg from '../../assets/logo.svg'

import { Drawer } from '../drawer'

import * as S from './styles'

export function Header() {
  const [isOpen, toggleOpen] = useReducer((state) => !state, false)

  const {
    itemsQuantity,
    totalCartValue,
    cartItems,
    removeItemFromCart
  } = useCart()

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
          onClick={toggleOpen}
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
        onClose={toggleOpen}
      >
        <S.CartHeader>
          <button
            type="button"
            title="Fechar carrinho"
            onClick={toggleOpen}
          >
            <X weight="bold" color="#8D8D99" size={24} />
          </button>
        </S.CartHeader>

        <S.CartContent>
          <strong>Sacola de compras</strong>

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

          <button type="button" disabled={itemsQuantity === 0}>
            Finalizar compra
          </button>
        </S.CartFooter>
      </Drawer>
    </>
  )
}
