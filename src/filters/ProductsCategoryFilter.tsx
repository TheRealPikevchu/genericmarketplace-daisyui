import React, { useEffect, useState } from 'react'
import ProductsGrid from '../components/ProductsGrid'
import ProductGroupProperties from '../interface/ProductGroupProperties'
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
    const [fetchedProducts, setProducts] = useState<ProductGroupProperties>()

    const { products, isLoading, error } = useGetCategoryProducts({
        slug: slug,
        skip: page * maxElements,
        limit: maxElements,
        dummy: true,
    })

    useEffect(() => {
        if (!isLoading) setProducts(products)
        console.log('from filter', slug, page, products, isLoading, error)
    }, [products, isLoading])

    return <ProductsGrid products={fetchedProducts} />
}

export default ProductsCategoryFilter
