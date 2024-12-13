import React from 'react'
import Carousel from '../components/Carousel'

interface ProductHighlightProperties {}

const ProductHighlight: React.FC<ProductHighlightProperties> = () => {
    return <Carousel>{/** Use children to pass cards. */}</Carousel>
}

export default ProductHighlight
