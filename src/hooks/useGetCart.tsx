import CartEntryProperties from '../interface/CartEntryProperties'
import { useLocalStorage } from '@uidotdev/usehooks'

const useGetCart = (): [CartEntryProperties[]] => {
    const [cart, setCart] = useLocalStorage<CartEntryProperties[]>('cart', [])

    return [cart]
}

export default useGetCart
