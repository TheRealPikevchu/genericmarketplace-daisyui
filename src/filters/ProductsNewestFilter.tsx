import React, { useEffect, useState } from 'react'
import ProductsGrid from '../components/ProductsGrid'
import { Link } from 'react-router-dom'
import useGetNewestProducts from '../hooks/useGetNewestProducts'

interface ProductsNewestFilterProperties {
    name: string
    page: number
    maxElements?: number
    onPageChange: (newPage: number) => void
}

const ProductsNewestFilter: React.FC<ProductsNewestFilterProperties> = ({
    name,
    page,
    maxElements = 25,
    onPageChange,
}) => {
    const [totalProducts, setTotal] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    const { products, isLoading, error } = useGetNewestProducts({
        skip: page * maxElements,
        max: maxElements,
    })

    useEffect(() => {
        if (!isLoading && products) {
            setTotal(products.total)
        }
    }, [products, isLoading])

    useEffect(() => {
        setTotalPages(Math.ceil(totalProducts / maxElements))
    }, [totalProducts])

    const navigateToPage = (index: number) => {
        onPageChange(index)
    }

    // TODO : porperly make use of theme
    const buttonLayout =
        'join-item btn btn-sm md:btn-md border-orange-300 bg-orange-200 text-sky-800 hover:bg-orange-500 hover:border-orange-500 hover:text-white'

    return (
        <>
            <h1 key={`${products}`}>{name}</h1>
            <div className="flex flex-row flex-wrap md:gap-y-6">
                {totalProducts !== 0 ? (
                    <>
                        <ProductsGrid products={products} />
                        {totalPages > 1 && (
                            <div className="join w-full flex justify-center">
                                <button
                                    className={buttonLayout}
                                    onClick={() => navigateToPage(0)}
                                >
                                    «
                                </button>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => (
                                        <button
                                            className={buttonLayout}
                                            onClick={() =>
                                                navigateToPage(index)
                                            }
                                            key={index}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}
                                <button
                                    className={buttonLayout}
                                    onClick={() =>
                                        navigateToPage(totalPages - 1)
                                    }
                                >
                                    »
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    !isLoading && (
                        <p className="text-sky-800 text-justify">
                            Seems like we coudn't find what you are searching
                            for...
                            <br />
                            You could maybe find a similar product by browsing
                            our{' '}
                            <Link
                                to="/categories"
                                className="text-orange-500 hover:underline"
                            >
                                categories
                            </Link>{' '}
                            ?
                        </p>
                    )
                )}
            </div>
        </>
    )
}

export default ProductsNewestFilter
