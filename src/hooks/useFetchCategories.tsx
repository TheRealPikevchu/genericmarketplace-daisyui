import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CategoriesProperties from '../interface/CategoryProperties'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/categories'
interface UseFetchCategoriesOptions {
    url?: string
    dummy?: boolean
}

const useFetchCategories = ({
    url = defaultURL,
    dummy = false,
}: UseFetchCategoriesOptions) => {
    const [categories, setCategories] = useState<CategoriesProperties[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${dummy ? debugURL : url}`)
                const categoriesData = response.data as CategoriesProperties[]
                setCategories(categoriesData)
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories()
    }, [url])

    return { categories, isLoading, error }
}

export default useFetchCategories
