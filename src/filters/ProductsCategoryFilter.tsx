import React, { useEffect, useState } from 'react'
import ProductsGrid from '../components/ProductsGrid'
import useGetCategoryProducts from '../hooks/useGetCategoryProducts'
import { useSearchParams } from 'react-router-dom'

interface ProductsCategoryFilterProperties {
    slug: string
    page: number
    maxElements?: number
}

const ProductsCategoryFilter: React.FC<ProductsCategoryFilterProperties> = ({
    slug,
    page,
    maxElements = 25,
}) => {
    const [totalProducts, setTotal] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [searchParams, setSearchParams] = useSearchParams()

    const { products, isLoading, error } = useGetCategoryProducts({
        slug: slug,
        skip: page * maxElements,
        limit: maxElements,
        dummy: true,
    })

    useEffect(() => {
        if (!isLoading && products) setTotal(products.total)
    }, [products, isLoading])

    useEffect(() => {
        setTotalPages(Math.ceil(totalProducts / maxElements))
    }, [totalProducts])

    const navigateToPage = (index: number) => {
        setSearchParams('?category=' + slug + '&page=' + index)
    }

    return (
        <>
            <ProductsGrid products={products} />
            {totalPages > 1 && (
                <div className="join w-full flex justify-center">
                    <button className="join-item btn">«</button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className="join-item btn"
                            onClick={() => navigateToPage(index)}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button className="join-item btn">»</button>
                </div>
            )}
        </>
    )
}

export default ProductsCategoryFilter
