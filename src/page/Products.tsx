import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'
import useFetchCategories from '../hooks/useFetchCategories'

interface ProductsPageProperties {}

const pageMaxElements = 25

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [categoryFromParams, setCategoryFromParams] = useState<string>('all')
    const [pageFromParams, setPageFromParams] = useState<number>(0)

    const { categories, error, isLoading } = useFetchCategories({ dummy: true })
    const [categoryName, setName] = useState<string>('All products')

    useEffect(() => {
        const category = searchParams.get('category') || 'all'
        const page = parseInt(searchParams.get('page') || '0', 10)

        setCategoryFromParams(category)
        setPageFromParams(page)
        // TODO : WHY NO RELOAD ON SEARCHPARAMS CHANGE ?????
    }, [searchParams])

    useEffect(() => {
        if (!isLoading) {
            if (categoryFromParams === 'all') {
                setName('All our products')
            } else {
                const category = categories.find(
                    (c) => c.slug === categoryFromParams
                )?.name
                setName(category || 'Something went wrong...')
            }
        }
    }, [categories, isLoading, categoryFromParams])

    return (
        <>
            <Breadcrumbs />
            <div className="py-4 px-8">
                <h1>{categoryName}</h1>
                {!isLoading && (
                    <div className="flex flex-row flex-wrap">
                        <ProductsCategoryFilter
                            slug={categoryFromParams}
                            page={pageFromParams}
                            maxElements={pageMaxElements}
                            onPageChange={(newPage) => {
                                setSearchParams({
                                    category: categoryFromParams,
                                    page: newPage.toString(),
                                })
                            }}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsPage
