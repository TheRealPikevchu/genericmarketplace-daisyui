import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseFetchProductOptions {
    productID: string
    url?: string
    dummy?: boolean
}

const useFetchProduct = ({
    productID,
    url = defaultURL,
    dummy = false,
}: UseFetchProductOptions) => {
    const [product, setProduct] = useState<ProductProperties | null>(null)
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
            } finally {
                setIsLoading(false)
            }
        }
        fetchProduct()
    }, [productID, url])

    return { product, isLoading, error }
}

export default useFetchProduct
