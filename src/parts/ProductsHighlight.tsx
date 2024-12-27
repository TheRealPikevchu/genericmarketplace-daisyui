import React from 'react'
import ProductCard from '../components/ProductCard'

const ProductsHighlight: React.FC = () => {
    return (
        <div className="py-4 px-8">
            <h1>New products</h1>
            <div className="flex flex-row flex-wrap">
                <ProductCard id="1" />
                <ProductCard id="2" />
                <ProductCard id="3" />
                <ProductCard id="4" />
                <ProductCard id="28" />
                <ProductCard id="15" />
            </div>
        </div>
    )
}

export default ProductsHighlight
