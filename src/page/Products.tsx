import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductsCategoryFilter from '../filters/ProductsCategoryFilter'

interface ProductsPageProperties {}

const pageMaxElements = 25

const ProductsPage: React.FC<ProductsPageProperties> = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPageID, setCurrentPage] = useState<number>(0)
    const [category, setCategory] = useState<string>('')

    useEffect(() => {
        const cat = searchParams.get('category')
        if (cat !== null) {
            setCategory(cat)
            // TODO : Get category name here
        }

        const page = searchParams.get('page')
        if (page !== null) {
            setCurrentPage(parseInt(page))
        }
    }, [searchParams])

    return (
        <>
            <Breadcrumbs />
            <div className="py-4 px-8">
                <h1>{category ? category : 'All our products'}</h1>
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
