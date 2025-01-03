import React from 'react'
import ProductGroupProperties from '../interface/ProductGroupProperties'
import ProductCard from './ProductCard'

interface ProductsGridProperties {
    products: ProductGroupProperties | undefined
}

const ProductsGrid: React.FC<ProductsGridProperties> = ({ products }) => {
    return (
        <>
            {products?.products.map((product) => (
                <ProductCard
                    id={product.id.toString()}
                    key={product.title + '_' + product.id}
                />
            ))}
        </>
    )
}

export default ProductsGrid
