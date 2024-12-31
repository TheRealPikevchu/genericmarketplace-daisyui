import ProductProperties from './ProductProperties'

interface ProductGroupProperties {
    limit: number
    products: ProductProperties[]
    skip: number
    total: number
}

export default ProductGroupProperties
