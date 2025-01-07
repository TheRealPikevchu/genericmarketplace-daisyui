import React, { useEffect, useState } from 'react'
import CartEntryProperties from '../interface/CartEntryProperties'
import { useLocalStorage } from '@uidotdev/usehooks'

const useAddToCart = (): [
    CartEntryProperties[],
    (ID: string, price: number) => void,
] => {
    const [cart, setCart] = useLocalStorage<CartEntryProperties[]>('cart', [])

    const addToCart = (ID: string, price: number) => {
        try {
            let potentialNewItem: CartEntryProperties = {
                ID: ID,
                quantity: 1,
                price: price,
            }

            if (!cart) {
                setCart([potentialNewItem])
                return
            }

            const storedItemIndex: number | undefined = cart.findIndex(
                (item) => item.ID === ID
            )
            if (storedItemIndex !== -1) {
                const tmpCart = [...cart]
                tmpCart[storedItemIndex] = {
                    ID: ID,
                    quantity: tmpCart[storedItemIndex].quantity + 1,
                    price: price,
                }
                setCart(tmpCart)
            } else {
                setCart([...cart, potentialNewItem])
            }
        } catch (error) {
            console.error('Error parsing shopping cart:', error)
        }
    }

    return [cart, addToCart]
}

export default useAddToCart
