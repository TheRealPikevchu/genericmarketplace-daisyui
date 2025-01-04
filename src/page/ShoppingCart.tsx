import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import CartProperties from '../interface/CartProperties'
import CartCard from '../components/CartCard'

const ShoppingCartPage: React.FC = () => {
    const debugCart: CartProperties = {
        items: [
            { ID: '1', quantity: 2 },
            { ID: '5', quantity: 1 },
            { ID: '12', quantity: 3 },
        ],
    }
    /**
     * TODO :
     *  hook to fetch shopping cart
     *  if empty
     *    offer to redirect
     *  else
     *    calculate total
     *    summary - list items
     *    summary - display total
     *    summary - proceed to cash out button
     *    SUMMARY IS STICKY
     *    products list
     *      cart product card template
     *
     *  make "add to cart" button usable
     *    hook for add to cart ?
     */
    return (
        <div className="py-4 px-8">
            <Breadcrumbs />
            <h1>Shopping cart</h1>
            <div className="flex flex-col justify-end">
                {/** ?? Collapsable when scrolling ?? */}
                <h2>Order summary</h2>
                <div>{/** Cart summary goes here */}</div>
            </div>
            <div className="flex flex-col gap-1.5">
                <h2>Detail</h2>
                {/** Shopping cart cards goes here */}
                {debugCart.items.map((item) => (
                    <CartCard
                        ID={item.ID}
                        quantity={item.quantity}
                        key={item.ID + '_' + item.quantity}
                    />
                ))}
            </div>
        </div>
    )
}

export default ShoppingCartPage
