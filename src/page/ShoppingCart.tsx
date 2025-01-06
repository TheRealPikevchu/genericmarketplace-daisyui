import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import CartCard from '../components/CartCard'
import usePutToCart from '../hooks/usePutToCart'
import { Link } from 'react-router-dom'
import CartLine from '../components/CartLine'

const ShoppingCartPage: React.FC = () => {
    const [storedCart, putToCart] = usePutToCart()

    const [totalPrice, setTotalPrice] = useState<number>(0)

    useEffect(() => {
        if (storedCart && storedCart.length > 0) {
            setTotalPrice(
                storedCart.reduce((total, item) => {
                    return total + item.price * item.quantity
                }, 0)
            )
        }
    }, [storedCart])

    return (
        <div className="flex flex-col py-4 px-8 gap-y-3">
            <Breadcrumbs />
            <h1 className="w-full bg-white">Shopping cart</h1>
            {storedCart && storedCart.length > 0 ? (
                <>
                    <div className="flex flex-col justify-end text-right w-full gap-y-1.5">
                        <h2 className="text-sky-950 text-lg">Order summary</h2>
                        {storedCart?.map((item) => (
                            <CartLine
                                key={item.ID + '_' + item.quantity}
                                ID={item.ID}
                                quantity={item.quantity}
                            />
                        ))}
                        <h2 className="text-sky-950 text-lg">Total</h2>
                        <h2 className="text-sky-950">
                            {totalPrice.toFixed(2) + '€'}
                        </h2>
                        <button className="btn btn-lg w-full bg-orange-600 border-orange-500 text-white hover:bg-sky-950">
                            Proceed to cash out
                        </button>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-sky-950">Detail :</h2>
                        {storedCart?.map((item) => (
                            <CartCard
                                ID={item.ID}
                                quantity={item.quantity}
                                key={item.ID + '_' + item.quantity}
                                removeItem={(ID: string, price: number) => {
                                    putToCart({
                                        ID: ID,
                                        quantity: 0,
                                        price: price,
                                    })
                                }}
                                updateValue={(
                                    itemID: string,
                                    price: number,
                                    quantityModifier: number
                                ) => {
                                    putToCart({
                                        ID: itemID,
                                        quantity:
                                            quantityModifier + item.quantity,
                                        price: price,
                                    })
                                }}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-sky-950 my-6">
                    Nothing here... yet! <br /> Let's browse our{' '}
                    <Link to="/products/" className="underline text-orange-500">
                        products
                    </Link>{' '}
                    or{' '}
                    <Link
                        to="/categories/"
                        className="underline text-orange-500"
                    >
                        categories
                    </Link>{' '}
                    to find what you need !
                </p>
            )}
        </div>
    )
}

export default ShoppingCartPage
