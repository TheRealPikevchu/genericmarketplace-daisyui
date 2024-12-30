import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import LoadedImage from './LoadedImage'
import useFetchProduct from '../hooks/useFetchProduct'

interface CategoryCardProperties {
    slang: string
    name: string
}

const CategoryCard: React.FC<CategoryCardProperties> = ({ slang, name }) => {
    // implement useFetchCategoryThumb
    // get first product of category
    // get product thumb
    // return it as category thumb

    // implement Products page, and link to it with category as param

    const productThumb = ''
    if (slang === undefined) {
        return <Navigate to="/404" />
    }

    return (
        <div className="flex flex-col px-1.5 py-3 gap-1.5 w-2/4 text-sky-800 justify-around group">
            <Link to={'/products?category=' + slang}>
                <div className="drop-shadow-md w-full md:w-1/3 rounded-lg overflow-hidden flex flex-col-reverse aspect-video p-3">
                    <div className="flex justify-center bg-white text-center py-3">
                        <h2 className="text-sky-950">{name}</h2>
                    </div>
                    <LoadedImage
                        src={productThumb}
                        alt={name + ' thumbnail'}
                        layout="w-full aspect-square object-cover rounded-xl group-hover:shadow-md"
                    />
                </div>
            </Link>
        </div>
    )
}

export default CategoryCard
