import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import LoadedImage from './LoadedImage'
import useFetchProduct from '../hooks/useFetchProduct'
import useFetchCategoryThumb from '../hooks/useFetchCategoryThumb'

interface CategoryCardProperties {
    slug: string
    name: string
}

const CategoryCard: React.FC<CategoryCardProperties> = ({ slug, name }) => {
    const productThumbFetch = useFetchCategoryThumb({
        slug: slug,
    })
    const [productThumb, setProductThumb] = useState<string>()

    useEffect(() => {
        setProductThumb(productThumbFetch.thumb)
    }, [productThumbFetch])

    return (
        <div className="flex flex-col px-1.5 py-3 w-full md:w-1/3 justify-around group">
            <Link to={'/products?category=' + slug}>
                <div className="drop-shadow-lg group-hover:drop-shadow-xl bg-white rounded-xl overflow-hidden flex flex-col-reverse">
                    <div className="flex bg-white py-3 w-full">
                        <h2 className="text-sky-950 text-center w-full group-hover:underline">
                            {name}
                        </h2>
                    </div>
                    <LoadedImage
                        src={productThumb}
                        alt={name + ' thumbnail'}
                        layout="w-full aspect-video object-contain full"
                    />
                </div>
            </Link>
        </div>
    )
}

export default CategoryCard
