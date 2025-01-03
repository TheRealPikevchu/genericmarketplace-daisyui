import React, { useEffect, useState } from 'react'
import ProductsGrid from '../components/ProductsGrid'
import useGetCategoryProducts from '../hooks/useGetCategoryProducts'

interface ProductsCategoryFilterProperties {
    slug: string
    page: number
    maxElements?: number
    onPageChange: (newPage: number) => void
}

const ProductsCategoryFilter: React.FC<ProductsCategoryFilterProperties> = ({
    slug,
    page,
    maxElements = 25,
    onPageChange,
}) => {
    const [totalProducts, setTotal] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)

    const { products, isLoading, error } = useGetCategoryProducts({
        slug: slug,
        skip: page * maxElements,
        limit: maxElements,
        dummy: true,
    })

    useEffect(() => {
        if (!isLoading && products) setTotal(products.total)
    }, [products, isLoading, slug])

    useEffect(() => {
        setTotalPages(Math.ceil(totalProducts / maxElements))
    }, [totalProducts])

    const navigateToPage = (index: number) => {
        onPageChange(index)
    }

    // TODO : if category is wrong or pageID > totalPage, go to 404

    return (
        <>
            <ProductsGrid products={products} />
            {totalPages > 1 && (
                <div className="join w-full flex justify-center">
                    <button
                        className="join-item btn btn-sm md:btn-md"
                        onClick={() => navigateToPage(0)}
                    >
                        «
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className="join-item btn btn-sm md:btn-md"
                            onClick={() => navigateToPage(index)}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="join-item btn btn-sm md:btn-md"
                        onClick={() => navigateToPage(totalPages - 1)}
                    >
                        »
                    </button>
                </div>
            )}
        </>
    )
}

export default ProductsCategoryFilter
