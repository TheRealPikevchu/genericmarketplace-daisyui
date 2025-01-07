import React, { useEffect, useState } from 'react'
import useFetchProduct from '../hooks/useFetchProduct'

interface CartLineProperties {
    ID: string
    quantity: number
}

const CartLine: React.FC<CartLineProperties> = ({ ID, quantity }) => {
    const { product, isLoading, error } = useFetchProduct({
        productID: ID,
    })

    const [finalPrice, setFinalPrice] = useState<number>(0)

    useEffect(() => {
        if (!isLoading && product) {
            setFinalPrice(
                product.price -
                    (product.price * product.discountPercentage) / 100
            )
        }
    }, [product, isLoading])

    return (
        <>
            {isLoading ? (
                <div className={'skeleton w-2/3 h-4'}></div>
            ) : (
                <p>
                    {product?.title} - {finalPrice.toFixed(2) + '€'} x{' '}
                    {quantity}
                </p>
            )}
        </>
    )
}

export default CartLine
