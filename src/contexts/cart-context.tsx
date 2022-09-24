import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

type ProductData = {
  id: string
  name: string
  imageUrl: string
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
    setCartItems((state) => {
      const alreadyExists = state.some((stateData) => {
        return stateData.id === item.id
      })

      if (alreadyExists) return state

      return [...state, item]
    })
  }, [])

  const removeItemFromCart = useCallback((itemId: string) => {
    setCartItems((state) => state.filter((item) => item.id !== itemId))
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
