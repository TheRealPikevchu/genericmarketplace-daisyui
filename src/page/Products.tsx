import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'
import useFetchCategories from '../hooks/useFetchCategories'

interface ProductsPageProperties {}

const pageMaxElements = 25

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [categoryFromParams, setCategoryFromParams] = useState<string>('all')
    const [pageFromParams, setPageFromParams] = useState<number>(0)

    const { categories, error, isLoading } = useFetchCategories()
    const [categoryName, setName] = useState<string>('All products')

    const [crumbs, setCrumbs] = useState<{ name: string; path: string }>()

    const navitage = useNavigate()

    useEffect(() => {
        const category = searchParams.get('category') || 'all'
        const page = parseInt(searchParams.get('page') || '0', 10)

        setCategoryFromParams(category)
        setPageFromParams(page)
    }, [searchParams])

    useEffect(() => {
        if (!isLoading) {
            if (categoryFromParams === 'all') {
                setName('All our products')
            } else {
                const category = categories.find(
                    (c) => c.slug === categoryFromParams
                )?.name
                if (!category) navitage('/404')
                setName(category || 'Something went wrong...')
                if (category)
                    setCrumbs({
                        name: category,
                        path: '/products?category=' + categoryFromParams,
                    })
            }
        }
    }, [categories, isLoading, categoryFromParams])

    const navigateToPage = (newPage: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('page', newPage.toString())
        setSearchParams(newSearchParams)
    }

    return (
        <>
            <div>
                <Breadcrumbs
                    crumbs={[crumbs ?? { name: 'Products', path: '/products' }]}
                />
                <h1>{categoryName}</h1>
                {!isLoading && (
                    <div className="flex flex-row flex-wrap md:gap-y-6">
                        <ProductsCategoryFilter
                            key={`${categoryFromParams}-${pageFromParams}`}
                            slug={categoryFromParams}
                            page={pageFromParams}
                            maxElements={pageMaxElements}
                            onPageChange={(newPage) => navigateToPage(newPage)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default ProductsPage
