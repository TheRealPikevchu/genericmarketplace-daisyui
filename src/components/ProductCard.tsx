import React from 'react'

interface ProductCardProperties {
    id: string
}

const ProductCard: React.FC<ProductCardProperties> = ({ id }) => {
    const price = 499.9
    const promotion = 10

    const finalPrice = (price - (price * promotion) / 100).toFixed(2)

    return (
        <div className="flex flex-col px-1.5 py-3 gap-1.5 w-2/4 text-sky-950 justify-around">
            <img
                src="../assets/washing-machine.jpg"
                alt="washing machine"
                className="w-full aspect-square object-cover rounded-xl"
            />
            <h3>Generic whasing machine brand model 5</h3>
            <div className="flex flex-row w-full">
                <span className="archivo-black text-center">
                    {finalPrice + '€'}
                </span>
                {promotion > 0 && (
                    <>
                        <div className="justify-center w-full">
                            <p className="line-through text-center">
                                {price.toFixed(2)}€
                            </p>
                            <div className="flex bg-orange-500 rounded-full justify-center">
                                <span className="text-white">
                                    -{promotion}%
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProductCard
