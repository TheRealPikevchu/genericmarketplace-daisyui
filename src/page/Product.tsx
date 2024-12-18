import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchProduct from '../hooks/useFetchProduct'
import useFetchProductThumbnail from '../hooks/useFetchProductThumbnail'

interface ProductPageProperties {}

const ProductPage: React.FC<ProductPageProperties> = ({}) => {
    const { id } = useParams()
    const location = useLocation()

    // fetch product
    const { product, isLoading, error } = useFetchProduct({
        productID: id ? id : '-1',
        dummy: true,
    })
    const { hasThumbLoaded, hasThumbError } = useFetchProductThumbnail({
        thumbPath: product?.thumbnail,
    })

    if (id === undefined) {
        return <Navigate to="/404" />
    }

    // split data accordingly : title, description, images...
    // find related products
    // set up breadcrumbs

    return (
        <>
            <Breadcrumbs path={`${product?.title}`} />
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
            <div className="py-4 px-8">
                {!hasThumbLoaded ? (
                    <div className="skeleton w-full aspect-video"></div>
                ) : (
                    <img
                        src={product?.thumbnail}
                        className="w-full aspect-video object-contain"
                    />
                )}

                <h1>{product?.title}</h1>
            </div>
        </>
    )
}

export default ProductPage
