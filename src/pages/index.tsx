import Image from 'next/image'

import camiseta1 from '../assets/camisetas/1.png'
import camiseta2 from '../assets/camisetas/2.png'
import camiseta3 from '../assets/camisetas/3.png'

import * as S from '../styles/pages/home'

export default function Home() {
  return (
    <S.HomeContainer>
      <S.Product>
        <Image src={camiseta1} alt="" width={520} height={400} />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>
      <S.Product>
        <Image src={camiseta2} alt="" width={520} height={400} />

        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
      </S.Product>
    </S.HomeContainer>
  )
}
