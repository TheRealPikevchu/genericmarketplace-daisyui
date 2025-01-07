import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'
import ProductGroupProperties from '../interface/ProductGroupProperties'
import useDummy from '../data/dummyjson'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/category/'
interface UseFetchCategoryThumbOptions {
    slug: string
}

const useFetchCategoryThumb = ({ slug }: UseFetchCategoryThumbOptions) => {
    const [product, setProduct] = useState<ProductProperties | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    const [thumb, setThumb] = useState<string | undefined>()

    useEffect(() => {
        if (slug === 'all') {
            setThumb('../assets/logo.png')
            setIsLoading(false)
            return
        }
        const fetchCategory = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}${slug}`
                )
                const categoryData = response.data as ProductGroupProperties
                setProduct(categoryData.products[0])
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategory()
    }, [slug, defaultURL])

    useEffect(() => {
        setThumb(product?.thumbnail)
    }, [product])
    return { thumb, isLoading, error }
}

export default useFetchCategoryThumb
