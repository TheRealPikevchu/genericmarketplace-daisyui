import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'
import useDummy from '../data/dummyjson'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseFetchProductOptions {
    productID: string
}

const useFetchProduct = ({ productID }: UseFetchProductOptions) => {
    const [product, setProduct] = useState<ProductProperties | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}${productID}`
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
    }, [productID, defaultURL])

    return { product, isLoading, error }
}

export default useFetchProduct
