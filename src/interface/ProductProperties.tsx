interface ProductProperties {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    category: string
    tags?: string[]
    brand: string
    thumbnail: string
    images: string[]
}

export default ProductProperties
