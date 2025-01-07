import CartEntryProperties from '../interface/CartEntryProperties'
import { useLocalStorage } from '@uidotdev/usehooks'

const usePutToCart = (): [
    CartEntryProperties[],
    (value: CartEntryProperties) => void,
] => {
    const [cart, setCart] = useLocalStorage<CartEntryProperties[]>('cart', [])

    const putToCart = (entry: CartEntryProperties) => {
        try {
            if (!cart) {
                setCart([
                    {
                        ID: entry.ID,
                        quantity: entry.quantity,
                        price: entry.price,
                    },
                ])
                return
            }

            const storedItemIndex: number | undefined = cart.findIndex(
                (item) => item.ID === entry.ID
            )
            if (storedItemIndex !== -1) {
                const tmpCart = [...cart]
                if (entry.quantity === 0) {
                    tmpCart.splice(storedItemIndex, 1)
                } else {
                    tmpCart[storedItemIndex] = {
                        ID: entry.ID,
                        quantity: entry.quantity,
                        price: entry.price,
                    }
                }
                setCart(tmpCart)
            } else {
                setCart([
                    ...cart,
                    {
                        ID: entry.ID,
                        quantity: entry.quantity,
                        price: entry.price,
                    },
                ])
            }
        } catch (error) {
            console.error('Error parsing shopping cart:', error)
        }
    }

    return [cart, putToCart]
}

export default usePutToCart
