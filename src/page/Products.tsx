import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'
import useFetchCategories from '../hooks/useFetchCategories'
import ProductsSearchFilter from '../filters/ProductsSearchFilter'
import { useMediaQuery } from '@uidotdev/usehooks'
import ProductsNewestFilter from '../filters/ProductsNewestFilter'

interface ProductsPageProperties {}

enum PageType {
    none = -1,
    category = 0,
    search = 1,
    newest = 2,
    error = 404,
}

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const isMobile = useMediaQuery('only screen and (max-width : 640px)')
    const pageMaxElements = isMobile ? 24 : 25

    const [searchParams, setSearchParams] = useSearchParams()
    const [pageFromParams, setPageFromParams] = useState<number>(0)

    const [pageType, setType] = useState<PageType>(PageType.none)
    const [pageName, setName] = useState<string>('All products')
    const [crumbs, setCrumbs] = useState<{ name: string; path: string }>()

    const [categoryFromParams, setCategoryFromParams] = useState<string>('all')
    const categoriesFetch = useFetchCategories()

    const [searchFromParams, setSearchFromParams] = useState<string | null>(
        null
    )

    const navitage = useNavigate()
    const location = useLocation()

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
                    setName('Newest products')
                    setCrumbs({
                        name: 'Newest products',
                        path: '/products?newest',
                    })
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
            case PageType.search: {
                const search = searchParams.get('search')
                setSearchFromParams(search)
            }

            default:
                break
        }
    }, [searchParams, pageType])

    const navigateToPage = (newPage: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })

        const newSearchParams = new URLSearchParams(searchParams.toString())
        newSearchParams.set('page', newPage.toString())
        setSearchParams(newSearchParams)
    }

    //#region category
    useEffect(() => {
        if (pageType === PageType.category && !categoriesFetch.isLoading) {
            if (categoryFromParams === 'all') {
                setName('All our products')
                setCrumbs({
                    name: 'All products',
                    path: '/products?category=all',
                })
            } else {
                const category = categoriesFetch.categories.find(
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
    }, [
        pageType,
        categoriesFetch.isLoading,
        categoriesFetch.categories,
        categoryFromParams,
    ])
    //#endregion category

    //#region search
    useEffect(() => {
        if (pageType === PageType.search && searchFromParams) {
            setName(searchFromParams)
            setCrumbs({
                name: searchFromParams,
                path: location.pathname,
            })
        }
    }, [pageType, searchFromParams])
    //#endrefion search

    // TODO : split pagination on mobile ! too much page displayed on mobile.

    return (
        <>
            <Breadcrumbs
                key={`${searchParams}`}
                crumbs={[crumbs ?? { name: 'Products', path: '/products' }]}
            />
            {!categoriesFetch.isLoading && pageType === PageType.category && (
                <ProductsCategoryFilter
                    key={`${pageName}-${searchParams}-${categoryFromParams}-${pageFromParams}-${pageType}`}
                    slug={categoryFromParams}
                    name={pageName}
                    page={pageFromParams}
                    maxElements={pageMaxElements}
                    onPageChange={(newPage) => navigateToPage(newPage)}
                />
            )}
            {pageType === PageType.search && (
                <ProductsSearchFilter
                    key={`${pageName}-${searchParams}-${searchFromParams}-${pageFromParams}-${pageType}`}
                    searchQuery={searchFromParams}
                    name={pageName}
                    page={pageFromParams}
                    maxElements={pageMaxElements}
                    onPageChange={(newPage) => navigateToPage(newPage)}
                />
            )}
            {pageType === PageType.newest && (
                <ProductsNewestFilter
                    key={`${pageName}-${searchParams}-${searchFromParams}-${pageFromParams}-${pageType}`}
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
