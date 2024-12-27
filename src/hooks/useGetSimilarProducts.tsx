import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseGetSimilarProductsOptions {
    productID: string
    url?: string
    dummy?: boolean
}

interface ProductsResponseProperties {
    products: object[]
    total: number
    skip: number
    limit: number
}

const useGetSimilarProducts = ({
    productID,
    url = defaultURL,
    dummy = false,
}: UseGetSimilarProductsOptions) => {
    const [product, setProduct] = useState<ProductProperties | null>(null)
    const [products, setProducts] = useState<number[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${dummy ? debugURL : url}${productID}`
                )
                const productData = response.data
                setProduct(productData)
            } catch (error) {
                setError(error as Error)
            }
        }
        fetchProduct()
    }, [productID, url])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    `${dummy ? debugURL : url}/category/${product?.category}?limit=6&select=id`
                )
                const productsData = response.data as ProductsResponseProperties
                const formattedProductsData = productsData.products.map(
                    (item) => {
                        if (
                            typeof item === 'object' &&
                            item !== null &&
                            'id' in item
                        ) {
                            return item.id
                        }
                        return item
                    }
                )
                setProducts(formattedProductsData as number[])
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [product])

    return { products, isLoading, error }
}

export default useGetSimilarProducts
