import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchProduct from '../hooks/useFetchProduct'
import { Carousel } from 'react-responsive-carousel'
import useFetchImages from '../hooks/useFetchImages'
import useGetSimilarProducts from '../hooks/useGetSimilarProducts'
import ProductCard from '../components/ProductCard'

const ProductPage: React.FC = () => {
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

    const similarProductsFetch = useGetSimilarProducts({
        productID: id ? id : '-1',
        dummy: true,
    })

    const [similarProductsID, setSimilarProducts] = useState<number[]>([])
    useEffect(() => {
        similarProductsFetch.isLoading && console.log('still loading')
        if (similarProductsFetch.products)
            setSimilarProducts(similarProductsFetch.products)
    }, [similarProductsFetch])

    if (id === undefined) {
        return <Navigate to="/404" />
    }

    const price = productFetch.product?.price ?? 0
    const promotion = productFetch.product?.discountPercentage ?? 0

    const finalPrice = (price - (price * promotion) / 100).toFixed(2)

    // TODO : add custom skeleton style
    //          ultimately : implement a daisy ui theme
    return (
        <>
            <Breadcrumbs path={`${productFetch.product?.title}`} />
            <div
                id="product-description"
                className="py-4 px-8 flex flex-col gap-y-1.5"
            >
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
                        <p className="text-sky-950">
                            {productFetch.product?.description}
                        </p>
                        <h2 className="text-sky-950 mt-3">Similar products</h2>
                    </>
                )}
            </div>
            <div
                id="similar-products"
                className="py-4 px-8 flex flex-row flex-wrap gap-y-1.5 pt-0"
            >
                {productFetch.isLoading || similarProductsFetch.isLoading ? (
                    <div className="skeleton w-full h-6"></div>
                ) : (
                    similarProductsID.map((product) => {
                        return (
                            <ProductCard
                                id={product.toString()}
                                key={'product' + product.toString()}
                            />
                        )
                    })
                )}
            </div>
            <div className="md:hidden fixed bottom-0 w-full text-sky-950 bg-white mt-8 z-50">
                <div className="flex flex-col py-4 px-8 gap-4 over-shadow">
                    <div className="w-full flex flex-row justify-between">
                        <span className="archivo-black text-center group-hover:text-sky-950">
                            {finalPrice + '€'}
                        </span>
                        {promotion > 0 && (
                            <div className="flex flex-col items-center">
                                <p className="line-through text-center">
                                    {price.toFixed(2)}€
                                </p>
                                <div className="inline-block bg-orange-500 rounded-full px-2 py-1 group-hover:font-bold">
                                    <span className="text-white">
                                        -{promotion}%
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="btn btn-lg w-full bg-orange-600 border-orange-500 text-white">
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductPage
