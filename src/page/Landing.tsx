import React from 'react'
import ProductsHighlight from '../parts/ProductsHighlight'
import HighlightCarousel from '../parts/ProductHighlight'

interface LandingPageProperties {}

const LandingPage: React.FC<LandingPageProperties> = ({}) => {
    return (
        <>
            <HighlightCarousel />
            <ProductsHighlight />
        </>
    )
}

export default LandingPage
