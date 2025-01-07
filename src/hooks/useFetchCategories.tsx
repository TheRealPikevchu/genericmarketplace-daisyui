import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CategoriesProperties from '../interface/CategoryProperties'
import useDummy from '../data/dummyjson'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/categories/'

const useFetchCategories = () => {
    const [categories, setCategories] = useState<CategoriesProperties[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(
                    `${useDummy ? debugURL : defaultURL}`
                )
                const categoriesData = response.data as CategoriesProperties[]
                setCategories(categoriesData)
            } catch (error) {
                setError(error as Error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCategories()
    }, [defaultURL])

    return { categories, isLoading, error }
}

export default useFetchCategories
