import React, { useEffect, useState } from 'react'
import CartEntryProperties from '../interface/CartEntryProperties'

const useAddToCart = (): [
    CartEntryProperties[],
    (ID: string, price: number) => void,
] => {
    const [storedCart, setStoredCart] = useState<CartEntryProperties[]>(() => {
        try {
            const localCart = window.localStorage.getItem('cart')
            return localCart ? JSON.parse(localCart) : null
        } catch (error) {
            console.error('Error parsing localStorage key "cart":', error)
            return null
        }
    })

    useEffect(() => {
        try {
            window.localStorage.setItem('cart', JSON.stringify(storedCart))
        } catch (error) {
            console.error('Error parsing localStorage key "cart":', error)
        }
    }, [storedCart])

    const addToCart = (ID: string, price: number) => {
        try {
            let potentialNewItem: CartEntryProperties = {
                ID: ID,
                quantity: 1,
                price: price,
            }

            if (!storedCart) {
                setStoredCart([potentialNewItem])
                return
            }

            const storedItemIndex: number | undefined = storedCart.findIndex(
                (item) => item.ID === ID
            )
            if (storedItemIndex !== -1) {
                const tmpCart = [...storedCart]
                tmpCart[storedItemIndex] = {
                    ID: ID,
                    quantity: tmpCart[storedItemIndex].quantity + 1,
                    price: price,
                }
                setStoredCart(tmpCart)
            } else {
                setStoredCart([...storedCart, potentialNewItem])
            }
        } catch (error) {
            console.error('Error parsing shopping cart:', error)
        }
    }

    return [storedCart, addToCart]
}

export default useAddToCart
