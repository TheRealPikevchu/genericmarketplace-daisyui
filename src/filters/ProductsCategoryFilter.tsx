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
    // TODO : porperly make use of theme
    const buttonLayout =
        'join-item btn btn-sm md:btn-md border-orange-300 bg-orange-200 text-sky-800 hover:bg-orange-500 hover:border-orange-500 hover:text-white'

    return (
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
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            className={buttonLayout}
                            onClick={() => navigateToPage(index)}
                            key={index}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={buttonLayout}
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
