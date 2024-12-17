import React from 'react'
import { Link } from 'react-router-dom'

interface ProductCardProperties {
    id: string
}

const ProductCard: React.FC<ProductCardProperties> = ({ id }) => {
    const price = 499.9
    const promotion = 10

    const finalPrice = (price - (price * promotion) / 100).toFixed(2)

    return (
        // TODO : use sketeletons when while loading data (https://daisyui.com/components/skeleton/)
        <div className="flex flex-col px-1.5 py-3 gap-1.5 w-2/4 text-sky-800 justify-around group">
            <Link to={'product/' + id}>
                <img
                    src="../assets/washing-machine.jpg"
                    alt="washing machine"
                    className="w-full aspect-square object-cover rounded-xl group-hover:shadow-md"
                />
                <h3 className="group-hover:underline">
                    Generic whasing machine brand model 5
                </h3>
                <div className="flex flex-row w-full">
                    <span className="archivo-black text-center group-hover:text-sky-950">
                        {finalPrice + '€'}
                    </span>
                    {promotion > 0 && (
                        <>
                            <div className="flex flex-col items-center w-full">
                                <p className="line-through text-center">
                                    {price.toFixed(2)}€
                                </p>
                                <div className="inline-block bg-orange-500 rounded-full px-2 py-1 group-hover:font-bold">
                                    <span className="text-white">
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
