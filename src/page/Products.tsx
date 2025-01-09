import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'
import useFetchCategories from '../hooks/useFetchCategories'

interface ProductsPageProperties {}

const pageMaxElements = 25

enum PageType {
    none = -1,
    category = 0,
    search = 1,
    newest = 2,
    error = 404,
}

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageFromParams, setPageFromParams] = useState<number>(0)

    const [pageType, setType] = useState<PageType>(PageType.none)
    const [pageName, setName] = useState<string>('All products')
    const [crumbs, setCrumbs] = useState<{ name: string; path: string }>()

    const [categoryFromParams, setCategoryFromParams] = useState<string>('all')
    const { categories, error, isLoading } = useFetchCategories()

    const navitage = useNavigate()

    /**
     * TODO :
     * fetch search params
     *  check what key it contains
     *  regarding the contained key, load the needed filter
     */

    useEffect(() => {
        const entries = Array.from(searchParams.entries())
        if (entries.length === 0) {
            setType(PageType.category)
            return
        }

        entries.map((entry) => {
            switch (entry[0]) {
                case 'page': {
                    const page = parseInt(searchParams.get('page') || '0', 10)
                    setPageFromParams(page)
                    break
                }
                case 'category': {
                    setType(PageType.category)
                    break
                }
                case 'search': {
                    setType(PageType.search)
                    break
                }
                case 'newest': {
                    setType(PageType.newest)
                    break
                }
                default: {
                    setType(PageType.error)
                    break
                }
            }
        })
    }, [searchParams])

    useEffect(() => {
        switch (pageType) {
            case PageType.category: {
                const category = searchParams.get('category') || 'all'

                setCategoryFromParams(category)
                break
            }

            default:
                break
        }
    }, [pageType])

    const navigateToPage = (newPage: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('page', newPage.toString())
        setSearchParams(newSearchParams)
    }

    //#region category
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
    }, [pageType, categories, isLoading, categoryFromParams])
    //#endregion category

    return (
        <>
            <Breadcrumbs
                key={`${searchParams}`}
                crumbs={[crumbs ?? { name: 'Products', path: '/products' }]}
            />
            {!isLoading && pageType === PageType.category && (
                <ProductsCategoryFilter
                    key={`${searchParams}-${categoryFromParams}-${pageFromParams}`}
                    slug={categoryFromParams}
                    name={pageName}
                    page={pageFromParams}
                    maxElements={pageMaxElements}
                    onPageChange={(newPage) => navigateToPage(newPage)}
                />
            )}
        </>
    )
}

export default ProductsPage
