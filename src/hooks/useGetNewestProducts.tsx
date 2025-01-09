import { useState, useEffect } from 'react'
import axios from 'axios'
import useDummy from '../data/dummyjson'
import ProductGroupProperties from '../interface/ProductGroupProperties'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseGetNewestProductsOptions {
    skip?: number
    limit?: number
    max?: number
}

const useGetNewestProducts = ({
    skip = 0,
    limit = 0,
    max = -1,
}: UseGetNewestProductsOptions) => {
    const [products, setProducts] = useState<ProductGroupProperties>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}?limit=${limit}&skip=${skip}&select=id,meta`
                )
                const productsData = response.data as ProductGroupProperties

                let sortedProductsData = productsData.products.sort((m, n) => {
                    if (!m.meta && !n.meta) {
                        return 0
                    }
                    if (!m.meta) {
                        return 1
                    }
                    if (!n.meta) {
                        return -1
                    }
                    const timeM = Date.parse(m.meta.createdAt)
                    const timeN = Date.parse(n.meta.createdAt)
                    return timeN - timeM
                })

                if (max > 0) {
                    sortedProductsData = sortedProductsData.slice(0, max)
                }

                const result: ProductGroupProperties = {
                    products: sortedProductsData,
                    limit: 0,
                    skip: skip,
                    total: sortedProductsData.length,
                }

                setProducts(result)
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [])

    return { products, isLoading, error }
}

export default useGetNewestProducts
