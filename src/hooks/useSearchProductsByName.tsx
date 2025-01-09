import { useState, useEffect } from 'react'
import axios from 'axios'
import useDummy from '../data/dummyjson'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products'
interface UseSearchProductsByNameOptions {
    searchQuery: string
    quantity?: number
}

interface ProductResponseProperties {
    id: string
    title: string
    description: string
    category: string
}

interface ProductsResponseProperties {
    products: ProductResponseProperties[]
    total: number
    skip: number
    limit: number
}

const useSearchProductsByName = ({
    searchQuery,
    quantity = -1,
}: UseSearchProductsByNameOptions) => {
    const [products, setProducts] = useState<string[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}?select=id,title,description,category`
                )
                const productsData = response.data as ProductsResponseProperties

                let formattedProductsData = productsData.products.filter(
                    (product) => {
                        const s = searchQuery.toLowerCase()
                        const isMatch =
                            product.title.toLowerCase().includes(s) ||
                            product.description.toLowerCase().includes(s) ||
                            product.category.toLowerCase().includes(s)
                        return isMatch
                    }
                )

                if (quantity > 0 && productsData.products.length > quantity) {
                    formattedProductsData = productsData.products.slice(
                        0,
                        quantity
                    )
                }
                setProducts(formattedProductsData.map((p) => p.id))
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProducts()
    }, [quantity, defaultURL])

    return { products, isLoading, error }
}

export default useSearchProductsByName
