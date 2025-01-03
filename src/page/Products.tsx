import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'
import useFetchCategories from '../hooks/useFetchCategories'

interface ProductsPageProperties {}

const pageMaxElements = 25

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageID, setCurrentPage] = useState<number>(0)
    const [category, setCategory] = useState<string>('')
    const [categoryName, setName] = useState<string>('')

    const { categories, error, isLoading } = useFetchCategories({ dummy: true })

    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat !== null) {
            setCategory(cat)
            if (!isLoading) {
                const name = categories.find((c) => c.slug === cat)?.name
                if (name) setName(name)
                else {
                    // TODO : Manage wrong category
                }
            }
        } else {
            setCategory('all')
            setName('All our products')
        }

        const page = searchParams.get('page')
        if (page !== null) {
            setCurrentPage(parseInt(page))
            console.log(page)
        }
    }, [searchParams, categories, isLoading])

    return (
        <>
            <Breadcrumbs />
            <div className="py-4 px-8">
                <h1>{categoryName}</h1>
                <div className="flex flex-row flex-wrap">
                    <ProductsCategoryFilter
                        slug={category}
                        page={currentPageID}
                        maxElements={pageMaxElements}
                    />
                </div>
            </div>
        </>
    )
}

export default ProductsPage
