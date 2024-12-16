import React from 'react'
import ProductHighlight from '../parts/ProductHighlight'
import ProductsHighlight from '../parts/ProductsHighlight'

interface LandingPageProperties {}

const LandingPage: React.FC<LandingPageProperties> = ({}) => {
    return (
        <>
            <ProductHighlight />
            <ProductsHighlight />
        </>
    )
}

export default LandingPage
