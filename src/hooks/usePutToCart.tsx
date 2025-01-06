import React, { useEffect, useState } from 'react'
import CartEntryProperties from '../interface/CartEntryProperties'

const usePutToCart = (): [
    CartEntryProperties[],
    (value: CartEntryProperties) => void,
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

    const putToCart = (entry: CartEntryProperties) => {
        try {
            if (!storedCart) {
                setStoredCart([
                    {
                        ID: entry.ID,
                        quantity: entry.quantity,
                        price: entry.price,
                    },
                ])
                return
            }

            const storedItemIndex: number | undefined = storedCart.findIndex(
                (item) => item.ID === entry.ID
            )
            if (storedItemIndex !== -1) {
                const tmpCart = [...storedCart]
                if (entry.quantity === 0) {
                    tmpCart.splice(storedItemIndex, 1)
                } else {
                    tmpCart[storedItemIndex] = {
                        ID: entry.ID,
                        quantity: entry.quantity,
                        price: entry.price,
                    }
                }
                setStoredCart(tmpCart)
            } else {
                setStoredCart([
                    ...storedCart,
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

    return [storedCart, putToCart]
}

export default usePutToCart
