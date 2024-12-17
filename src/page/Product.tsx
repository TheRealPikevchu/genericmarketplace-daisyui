import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'

interface ProductPageProperties {}

const ProductPage: React.FC<ProductPageProperties> = ({}) => {
    const { id } = useParams()
    const location = useLocation()

    // fetch product
    // split data accordingly : title, description, images...
    // find related products
    // set up breadcrumbs

    return (
        <>
            <Breadcrumbs />
            {/**
                display breadcrumbs
                display carousel with all available product image
                    images.map( image => image)
                title
                description
                related products (6 product + related categories card)
                    product cards | category card
                STUCK TO PAGE BOTTOM :
                    price section
                        price   old price
                                promo tag
                    add to cart button
             */}
            <h1>Product : {id}</h1>
        </>
    )
}

export default ProductPage
