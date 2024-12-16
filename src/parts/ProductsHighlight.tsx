import React from 'react'
import ProductCard from '../components/ProductCard'

interface ProductsHighlighProperties {}

const ProductsHighlight: React.FC<ProductsHighlighProperties> = ({}) => {
    return (
        <div className="py-4 px-8">
            <h1>New products</h1>
            <div className="flex flex-row flex-wrap">
                <ProductCard id="0" />
                <ProductCard id="0" />
                <ProductCard id="0" />
                <ProductCard id="0" />
                <ProductCard id="0" />
                <ProductCard id="0" />
            </div>
        </div>
    )
}

export default ProductsHighlight
