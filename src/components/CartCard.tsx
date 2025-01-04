import React, { useEffect, useState } from 'react'
import LoadedImage from './LoadedImage'
import useFetchProduct from '../hooks/useFetchProduct'

interface CartCardProperties {
    ID: string
    quantity: number
}
const CartCard: React.FC<CartCardProperties> = ({ ID, quantity }) => {
    const { product, isLoading, error } = useFetchProduct({
        productID: ID,
        dummy: true,
    })

    const [price, setPrice] = useState<number>(0)
    const [promotion, setPromotion] = useState<number>(0)
    const [finalPrice, setFinalPrice] = useState<number>(0)

    useEffect(() => {
        if (!isLoading && product) {
            setPrice(product.price)
            setPromotion(product.discountPercentage)
            setFinalPrice(
                product.price -
                    (product.price * product.discountPercentage) / 100
            )
        }
    }, [product, isLoading])

    const buttonStyle =
        'join-item btn btn-xs border-sky-950 bg-white text-sky-950 hover:bg-sky-950 hover:text-white'
    return (
        <div className="border text-sky-900 p-2">
            <div className="flex flex-row">
                <LoadedImage
                    src={isLoading ? '' : product?.thumbnail}
                    alt={product?.title}
                    layout="w-16 aspect-square"
                />
                <div className="flex flex-col w-full">
                    <h2>{product?.title}</h2>
                    <div className="flex flex-row items-center w-full justify-evenly text-xs">
                        <span className="archivo-black text-center">
                            {finalPrice.toFixed(2) + '€'}
                        </span>
                        {promotion > 0 && (
                            <>
                                <p className="line-through text-center">
                                    {price.toFixed(2)}€
                                </p>
                                <div className="inline-block bg-orange-500 rounded-full px-2 py-1 group-hover:font-bold">
                                    <span className="text-white">
                                        -{promotion}%
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row gap-1.5 items-center">
                    <div className="join">
                        <button className={buttonStyle}>+</button>
                        <span className={buttonStyle}>{quantity}</span>
                        <button className={buttonStyle}>-</button>
                    </div>
                    <button className="material-symbols-outlined btn btn-ghost p-0 text-lg no-underline">
                        delete
                    </button>
                </div>
                <h2>Total : {(finalPrice * quantity).toFixed(2) + '€'}</h2>
            </div>
        </div>
    )
}

export default CartCard
