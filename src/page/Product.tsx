import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchProduct from '../hooks/useFetchProduct'
import { Carousel } from 'react-responsive-carousel'
import useFetchImages from '../hooks/useFetchImages'
import useGetSimilarProducts from '../hooks/useGetSimilarProducts'
import ProductCard from '../components/ProductCard'
import useAddToCart from '../hooks/useAddToCart'

const ProductPage: React.FC = () => {
    const { id } = useParams()

    const { product, isLoading, error } = useFetchProduct({
        productID: id ? id : '-1',
    })

    const productImagesFetch = useFetchImages({
        src: product?.images,
    })

    const similarProductsFetch = useGetSimilarProducts({
        productID: id ? id : '-1',
    })

    const [similarProductsID, setSimilarProducts] = useState<number[]>([])

    const [storedCart, addToCart] = useAddToCart()

    const navigate = useNavigate()

    useEffect(() => {
        if (similarProductsFetch.products)
            setSimilarProducts(similarProductsFetch.products)
    }, [similarProductsFetch])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id])

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
        } else if (error || (!isLoading && !product)) {
            navigate('/404')
        }
    }, [product, isLoading])

    if (id === undefined) {
        return <Navigate to="/404" />
    }

    // TODO : improve breadcrumbs to use category instead of all products
    return (
        <>
            <Breadcrumbs
                crumbs={[
                    { name: 'Products', path: '/products' },
                    {
                        name: product?.title,
                        path: '/product/' + product?.id.toString(),
                    },
                ]}
            />
            <div className="flex flex-col md:flex-row gap-y-1.5 md:gap-x-1.5">
                <div className="w-full md:w-1/2">
                    {isLoading ? (
                        <div className="skeleton w-full aspect-video"></div>
                    ) : (
                        <div>
                            <Carousel autoPlay={false} showStatus={false}>
                                {product?.images.map((image, imageIndex) =>
                                    productImagesFetch.isLoading ? (
                                        <div
                                            key={
                                                product?.title +
                                                '-img_' +
                                                imageIndex
                                            }
                                            className="skeleton w-full aspect-video object-contain"
                                        >
                                            <img
                                                src="../assets/img_loading_placeholder.png"
                                                alt={
                                                    product?.title +
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
                                                product?.title +
                                                ' image ' +
                                                imageIndex
                                            }
                                            key={
                                                product?.title +
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
                </div>
                <div className="w-full md:w-1/2">
                    {isLoading ? (
                        <div className="flex flex-col lg:flex-row">
                            <div className="w-full lg:w-1/2">
                                <div className="skeleton w-2/3 h-8"></div>
                                <div className="skeleton w-full h-5"></div>
                                <div className="skeleton w-4/5 h-5"></div>
                            </div>
                            <div className="hidden md:flex flex-col">
                                <div className={'skeleton w-full h-8'}></div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:h-full md:justify-between">
                            <div className="w-full ">
                                <h1>{product?.title}</h1>
                                <p className="text-sky-950">
                                    {product?.description}
                                </p>
                            </div>
                            <div className="hidden md:flex flex-col gap-y-3">
                                <div className="flex flex-row items-center w-full justify-end gap-x-3 text-md text-sky-950">
                                    <span className="archivo-black text-center text-xl">
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

                                <button
                                    className="btn btn-lg w-full bg-orange-600 border-orange-500 text-white hover:bg-sky-950"
                                    onClick={() => addToCart(id, finalPrice)}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div>
                <>
                    {' '}
                    <h2 className="text-sky-950 mt-3">Similar products</h2>
                    <div className="flex flex-row flex-wrap gap-y-1.5 pt-0">
                        {isLoading || similarProductsFetch.isLoading ? (
                            <div className="skeleton w-full h-6"></div>
                        ) : (
                            similarProductsID.map((product) => {
                                return (
                                    <ProductCard
                                        id={product.toString()}
                                        key={'product' + product.toString()}
                                        customSize="md:w-1/6 w-1/2"
                                    />
                                )
                            })
                        )}
                    </div>
                </>
            </div>
            <div className="md:hidden fixed left-0 right-0 bottom-0 text-sky-950 bg-white mt-8 z-50">
                <div className="flex flex-col py-4 px-8 gap-4 over-shadow">
                    <div className="w-full flex flex-row justify-between">
                        <span className="archivo-black text-center group-hover:text-sky-950">
                            {finalPrice.toFixed(2) + '€'}
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
                    <button
                        className="btn btn-lg w-full bg-orange-600 border-orange-500 text-white hover:bg-sky-950"
                        onClick={() => addToCart(id, finalPrice)}
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductPage
