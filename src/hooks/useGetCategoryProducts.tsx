import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'
import ProductGroupProperties from '../interface/ProductGroupProperties'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products'

interface UseGetCategoryProductsOptions {
    slug: string
    skip?: number
    limit?: number
    url?: string
    dummy?: boolean
}

const useGetCategoryProducts = ({
    slug,
    skip = 0,
    limit = 25,
    url = defaultURL,
    dummy = false,
}: UseGetCategoryProductsOptions) => {
    const [products, setProducts] = useState<ProductGroupProperties>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // TODO : this is weird to do ?
                if (slug === '') throw new Error('invalid category.')

                const categoryPath = slug !== 'all' ? `/category/${slug}` : ''
                const response = await axios.get(
                    `${dummy ? debugURL : url}${categoryPath}?limit=${limit}&skip=${skip}&select=id`
                )
                const productsData = response.data as ProductGroupProperties

                setProducts(productsData)
            } catch (catchedError) {
                setError(catchedError as Error)
                console.error(catchedError)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [slug])

    return { products, isLoading, error }
}

export default useGetCategoryProducts
