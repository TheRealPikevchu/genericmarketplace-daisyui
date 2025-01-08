import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchCategories from '../hooks/useFetchCategories'
import CategoriesProperties from '../interface/CategoryProperties'
import CategoryCard from '../components/CategoryCard'

const CategoriesPage: React.FC = () => {
    const categoriesFetch = useFetchCategories()
    const [categories, setCategories] = useState<CategoriesProperties[]>([])

    useEffect(() => {
        setCategories(categoriesFetch.categories)
    }, [categoriesFetch.isLoading])

    return (
        <div className="flex flex-row flex-wrap">
            <Breadcrumbs
                crumbs={[{ name: 'Categories', path: '/categories' }]}
            />
            <h1 className="w-full my-2">Categories</h1>
            <CategoryCard slug="all" name="All products" />

            {categories.map((category) => (
                <CategoryCard
                    slug={category.slug}
                    name={category.name}
                    key={category.name + '_card'}
                />
            ))}
        </div>
    )
}

export default CategoriesPage
