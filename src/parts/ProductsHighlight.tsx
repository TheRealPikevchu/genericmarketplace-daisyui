import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import useGetNewestProducts from '../hooks/useGetNewestProducts'
import ProductGroupProperties from '../interface/ProductGroupProperties'

const ProductsHighlight: React.FC = () => {
    const { products, isLoading, error } = useGetNewestProducts({
        max: 6,
    })

    const [newestProducts, setNewestProducts] =
        useState<ProductGroupProperties>()
    useEffect(() => {
        if (!isLoading && products) setNewestProducts(products)
    }, [products, isLoading])

    return (
        <div>
            <h1>Newest products</h1>
            <div className="flex flex-row flex-wrap">
                {newestProducts?.products.map((product) => (
                    <ProductCard
                        id={product.id.toString()}
                        key={'newest_' + product.id}
                        customSize="md:w-1/3 w-1/2"
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsHighlight
