import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchCategories from '../hooks/useFetchCategories'
import CategoriesProperties from '../interface/CategoryProperties'
import CategoryCard from '../components/CategoryCard'
import { Link } from 'react-router-dom'
import LoadedImage from '../components/LoadedImage'

const CategoriesPage: React.FC = () => {
    const categoriesFetch = useFetchCategories()
    const [categories, setCategories] = useState<CategoriesProperties[]>([])

    useEffect(() => {
        setCategories(categoriesFetch.categories)
    }, [categoriesFetch.isLoading])

    return (
        <div>
            <Breadcrumbs />
            <div className="flex flex-row flex-wrap py-4 px-8">
                <h1 className="w-full my-2">Categories</h1>
                {/**TODO :  this should be a category card
                 *          fix the image not loading issue (works with another image i.e. logo.png)
                 */}
                {/* <CategoryCard slug="all" name="All products" /> */}
                <div className="flex flex-col px-1.5 py-3 w-full md:w-1/3 justify-around group">
                    <Link to={'/products/'}>
                        <div className="drop-shadow-lg group-hover:drop-shadow-xl bg-white rounded-xl overflow-hidden flex flex-col-reverse">
                            <div className="flex bg-white py-3 w-full">
                                <h2 className="text-sky-950 text-center w-full group-hover:underline">
                                    All products
                                </h2>
                            </div>
                            <LoadedImage
                                src={'../assets/shopping.png'}
                                alt={'all products thumbnail'}
                                layout="w-full aspect-video object-contain full"
                            />
                        </div>
                    </Link>
                </div>
                {categories.map((category) => (
                    <CategoryCard
                        slug={category.slug}
                        name={category.name}
                        key={category.name + '_card'}
                    />
                ))}
            </div>
        </div>
    )
}

export default CategoriesPage
