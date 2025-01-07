import React, { useState, useEffect } from 'react'
import ProductProperties from '../interface/ProductProperties'
import axios from 'axios'
import useDummy from '../data/dummyjson'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseGetNewestProductsOptions {
    quantity?: number
}

interface ProductResponseProperties {
    id: string
    meta: {
        createdAt: string
        updatedAt: string
        barcode: string
        qrCode: string
    }
}

interface ProductsResponseProperties {
    products: ProductResponseProperties[]
    total: number
    skip: number
    limit: number
}

const useGetNewestProducts = ({
    quantity = -1,
}: UseGetNewestProductsOptions) => {
    const [products, setProducts] = useState<string[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}?select=id,meta`
                )
                const productsData = response.data as ProductsResponseProperties

                let formattedProductsData = productsData.products.sort(
                    (m, n) => {
                        const timeM = Date.parse(m.meta.createdAt)
                        const timeN = Date.parse(n.meta.createdAt)
                        return timeN - timeM
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

export default useGetNewestProducts
