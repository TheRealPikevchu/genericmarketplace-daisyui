import { useState, useEffect } from 'react'
import axios from 'axios'
import useDummy from '../data/dummyjson'
import ProductGroupProperties from '../interface/ProductGroupProperties'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products'
interface UseSearchProductsByNameOptions {
    searchQuery: string | null
    skip?: number
    max?: number
}

const useSearchProductsByName = ({
    searchQuery,
    skip = 0,
    max = 25,
}: UseSearchProductsByNameOptions) => {
    const [products, setProducts] = useState<ProductGroupProperties>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)

                const totalResponse = await axios.get(
                    `${useDummy ? debugURL : defaultURL}?limit=0&select=id,title,category`
                )
                const totalProductsData =
                    totalResponse.data as ProductGroupProperties
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}?limit=0&skip=${skip}&select=id,title,category`
                )
                const productsData = response.data as ProductGroupProperties

                if (!searchQuery) {
                    setProducts(productsData)
                    return
                }

                const filteredProductsData = productsData.products
                    .filter((product) => {
                        const s = searchQuery.toLowerCase()
                        const isMatch =
                            product.title.toLowerCase().includes(s) ||
                            product.category.toLowerCase() === s

                        return isMatch
                    })
                    .slice(0, max)

                const filteredTotalProductsData =
                    totalProductsData.products.filter((product) => {
                        const s = searchQuery.toLowerCase()
                        const isMatch =
                            product.title.toLowerCase().includes(s) ||
                            product.category.toLowerCase() === s

                        return isMatch
                    })

                const result: ProductGroupProperties = {
                    products: filteredProductsData,
                    limit: 0,
                    skip: skip,
                    total: filteredTotalProductsData.length,
                }

                setProducts(result)
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [searchQuery, skip, defaultURL])

    return { products, isLoading, error }
}

export default useSearchProductsByName
