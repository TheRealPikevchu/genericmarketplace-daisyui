import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import LoadedImage from './LoadedImage'
import useFetchProduct from '../hooks/useFetchProduct'

interface ProductCardProperties {
    id: string
    customSize?: string
}

const ProductCard: React.FC<ProductCardProperties> = ({ id, customSize }) => {
    const productFetch = useFetchProduct({
        productID: id ? id : '-1',
    })

    if (id === undefined) {
        return <Navigate to="/404" />
    }

    const price = productFetch.product?.price ?? 0
    const promotion = productFetch.product?.discountPercentage ?? 0

    const finalPrice = (price - (price * promotion) / 100).toFixed(2)

    return (
        <div
            className={`flex flex-col px-1.5 py-3 gap-1.5 ${customSize ?? 'w-2/4 md:w-1/5'} text-sky-800 justify-around group`}
        >
            <Link to={'/product/' + id}>
                <LoadedImage
                    src={productFetch.product?.thumbnail}
                    alt={productFetch.product?.title}
                    layout="w-full aspect-square object-cover rounded-xl group-hover:shadow-md"
                />
                <h3 className="group-hover:underline">
                    {productFetch.product?.title}
                </h3>
                <div className="flex flex-row w-full justify-between">
                    <span className="archivo-black text-center group-hover:text-sky-950 md:text-sm">
                        {finalPrice + '€'}
                    </span>
                    {promotion > 0 && (
                        <>
                            <div className="flex flex-col items-center">
                                <p className="line-through text-center">
                                    {price.toFixed(2)}€
                                </p>
                                <div className="inline-block bg-orange-500 rounded-full px-2 py-1 group-hover:font-bold">
                                    <span className="text-white md:text-sm">
                                        -{promotion}%
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
