import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'

interface CategoriesPageProperties {}

const CategoriesPage: React.FC<CategoriesPageProperties> = ({}) => {
    return (
        <div>
            <Breadcrumbs />
            <h1>Categories</h1>
        </div>
    )
}

export default CategoriesPage
