import { useReducer } from 'react'
import Image from 'next/image'
import { Handbag, X } from 'phosphor-react'

import logoImg from '../../assets/logo.svg'

import { Drawer } from '../drawer'

import * as S from './styles'

export function Header() {
  const [isOpen, toggleOpen] = useReducer((state) => !state, false)

  return (
    <>
      <S.HeaderContainer>
        <Image src={logoImg.src} alt="" width={logoImg.width} height={logoImg.height} />

        <button
          type="button"
          title="Carrinho"
          onClick={toggleOpen}
        >
          <Handbag size={24} weight="bold" color="#8D8D99" />

          <span>2</span>
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
            <S.CartItem>
              <S.ImageContainer></S.ImageContainer>
              <S.CartItemDetails>
                <p>Camiseta X</p>
                <strong>R$ 70,70</strong>

                <button type="button">
                  Remover
                </button>
              </S.CartItemDetails>
            </S.CartItem>
          </S.CartList>
        </S.CartContent>

        <S.CartFooter>
          <S.CartInfoContainer>
            <S.InfoRow>
              <span>Quantidade</span>
              <span>3 itens</span>
            </S.InfoRow>

            <S.InfoRow>
              <b>Valor total</b>
              <strong>R$ 270,00</strong>
            </S.InfoRow>
          </S.CartInfoContainer>

          <button type="button">
            Finalizar compra
          </button>
        </S.CartFooter>
      </Drawer>
    </>
  )
}
