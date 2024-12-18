import React from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchProduct from '../hooks/useFetchProduct'
import { Carousel } from 'react-responsive-carousel'
import useFetchImages from '../hooks/useFetchImages'

interface ProductPageProperties {}

const ProductPage: React.FC<ProductPageProperties> = ({}) => {
    const { id } = useParams()
    const location = useLocation()

    // fetch product
    const productFetch = useFetchProduct({
        productID: id ? id : '-1',
        dummy: true,
    })

    const productImagesFetch = useFetchImages({
        src: productFetch.product?.images,
    })

    if (id === undefined) {
        return <Navigate to="/404" />
    }

    // TODO : add custom skeleton style
    //          ultimately : implement a daisy ui theme

    // find related products

    return (
        <>
            <Breadcrumbs path={`${productFetch.product?.title}`} />
            {/**
                related products (6 product + related categories card)
                    product cards | category card
                STUCK TO PAGE BOTTOM :
                    price section
                        price   old price
                                promo tag
                    add to cart button
             */}
            <div className="py-4 px-8 flex flex-col gap-y-1.5">
                {productFetch.isLoading ? (
                    <div className="skeleton w-full aspect-video"></div>
                ) : (
                    <div>
                        <Carousel autoPlay={false} showStatus={false}>
                            {productFetch.product?.images.map(
                                (image, imageIndex) =>
                                    productImagesFetch.isLoading[imageIndex] ? (
                                        <div
                                            key={
                                                productFetch.product?.title +
                                                '-img_' +
                                                imageIndex
                                            }
                                            className="skeleton w-full aspect-video object-contain"
                                        >
                                            <img
                                                src="../assets/img_loading_placeholder.png"
                                                alt={
                                                    productFetch.product
                                                        ?.title +
                                                    ' image ' +
                                                    imageIndex
                                                }
                                                className="skeleton w-full aspect-video object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={image}
                                            alt={
                                                productFetch.product?.title +
                                                ' image ' +
                                                imageIndex
                                            }
                                            key={
                                                productFetch.product?.title +
                                                '-img_' +
                                                imageIndex
                                            }
                                            className="w-full aspect-video object-contain"
                                        />
                                    )
                            )}
                        </Carousel>
                    </div>
                )}

                {productFetch.isLoading ? (
                    <>
                        <div className="skeleton w-2/3 h-8"></div>
                        <div className="skeleton w-full h-5"></div>
                        <div className="skeleton w-4/5 h-5"></div>
                        <div className="skeleton w-full h-5"></div>
                    </>
                ) : (
                    <>
                        <h1>{productFetch.product?.title}</h1>
                        <p>{productFetch.product?.description}</p>
                        <h2 className="text-sky-950">Similar products</h2>
                    </>
                )}
            </div>
        </>
    )
}

export default ProductPage
