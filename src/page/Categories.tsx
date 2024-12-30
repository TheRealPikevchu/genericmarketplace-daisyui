import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchCategories from '../hooks/useFetchCategories'
import CategoriesProperties from '../interface/CategoryProperties'

const CategoriesPage: React.FC = () => {
    const categoriesFetch = useFetchCategories({ dummy: true })
    const [categories, setCategories] = useState<CategoriesProperties[]>([])

    useEffect(() => {
        if (!categoriesFetch.isLoading && categoriesFetch.error === null)
            setCategories(categoriesFetch.categories)
    }, [categoriesFetch.isLoading])

    return (
        <div>
            <Breadcrumbs />
            <div className="flex flex-row flex-wrap py-4 px-8">
                <h1 className="w-full my-4 mx-8">Categories</h1>
                <div className="drop-shadow-md w-full md:w-1/3 rounded-lg overflow-hidden flex flex-col-reverse aspect-video p-3">
                    <div className="flex justify-center bg-white text-center py-3">
                        <h2 className="text-sky-950">All products</h2>
                    </div>
                    <img alt="category_name" />
                </div>
                {categories.map((category) => (
                    <div className="drop-shadow-md w-full md:w-1/3 rounded-lg overflow-hidden flex flex-col-reverse aspect-video p-3">
                        <div className="flex justify-center bg-white text-center py-3">
                            <h2 className="text-sky-950">{category.name}</h2>
                        </div>
                        <img alt="category_name" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoriesPage
