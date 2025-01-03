import React, { useEffect, useState } from 'react'
import ProductsGrid from '../components/ProductsGrid'
import useGetCategoryProducts from '../hooks/useGetCategoryProducts'

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
    const { products, isLoading, error } = useGetCategoryProducts({
        slug: slug,
        skip: page * maxElements,
        limit: maxElements,
        dummy: true,
    })

    return <ProductsGrid products={products} />
}

export default ProductsCategoryFilter
