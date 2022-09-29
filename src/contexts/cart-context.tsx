import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { setCookie, parseCookies } from 'nookies'
import toast from 'react-hot-toast';

type ProductData = {
  id: string
  name: string
  imageUrl: string
  defaultPriceId: string
  price: number
  formattedPrice: string
}

type CartContextData = {
  cartItems: ProductData[]
  itemsQuantity: number
  totalCartValue: {
    label: string
    amount: number
  }

  addItemToCart: (item: ProductData) => void
  removeItemFromCart: (itemId: string) => void
}

type CartProviderProps = PropsWithChildren

const CartContext = createContext({} as CartContextData)

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<ProductData[]>([])

  const addItemToCart = useCallback((item: ProductData) => {
    let itemAlreadyExists = false

    setCartItems((state) => {
      const alreadyExists = state.some((stateData) => {
        return stateData.id === item.id
      })

      if (alreadyExists) {
        itemAlreadyExists = true
        return state
      }

      return [...state, item]
    })

    if (itemAlreadyExists) {
      toast.error(`${item.name} já esta no carrinho`)
    } else {
      toast.success(`${item.name} adicionado ao carrinho`)
    }
  }, [])

  const removeItemFromCart = useCallback((itemId: string) => {
    let removedItem: ProductData

    setCartItems((state) => state.filter((item) => {
      if (item.id === itemId) removedItem = item

      return item.id !== itemId
    }))

    toast.success(`${removedItem.name} removido do carrinho`)
  }, [])

  const totalCartValue = useMemo(() => {
    const amount = cartItems.reduce((amount, item) => {
      return amount + item.price
    }, 0)

    return {
      amount,
      label: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)
    }
  }, [cartItems])

  useEffect(() => {
    if (cartItems.length > 0) {
      setCookie(null, '@ignite-shop:cart', JSON.stringify(cartItems))
    }
  }, [cartItems])

  useEffect(() => {
    const storagedCart = parseCookies()['@ignite-shop:cart']

    if (storagedCart) {
      const data = JSON.parse(storagedCart) as ProductData[]

      setCartItems(data)
    }
  }, [])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCartValue,
        itemsQuantity: cartItems.length,

        addItemToCart,
        removeItemFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
