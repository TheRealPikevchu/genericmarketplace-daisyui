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

const useGetSimilarProducts = ({
    productID,
    url = defaultURL,
    dummy = false,
}: UseGetSimilarProductsOptions) => {
    const [product, setProduct] = useState<ProductProperties | null>(null)
    const [products, setProducts] = useState<ProductProperties[] | null>(null)
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
                    `${dummy ? debugURL : url}/category/${product?.category}`
                )
                // TODO : use ID select
                const productsData = response.data
                setProducts(productsData)
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
