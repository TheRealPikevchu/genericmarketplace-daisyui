import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import useGetNewestProducts from '../hooks/useGetNewestProducts'

const ProductsHighlight: React.FC = () => {
    const { products, isLoading, error } = useGetNewestProducts({
        quantity: 6,
    })

    const [newestProductsID, setNewestProductsID] = useState<string[]>([])
    useEffect(() => {
        if (!isLoading && products) setNewestProductsID(products)
    }, [products, isLoading])

    return (
        <div>
            <h1>Newest products</h1>
            <div className="flex flex-row flex-wrap">
                {newestProductsID?.map((product) => (
                    <ProductCard
                        id={product}
                        key={'newest_' + product}
                        customSize="md:w-1/3 w-1/2"
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsHighlight
