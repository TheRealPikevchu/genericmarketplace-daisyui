import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import paths from '../data/paths'

interface BreadcrumbsProperties {
    crumbs: {
        name: string | undefined
        path: string | undefined
    }[]
}

const Breadcrumbs: React.FC<BreadcrumbsProperties> = ({ crumbs }) => {
    const [breadcrumbs, setBreadcrumbs] = useState<
        {
            name: string | undefined
            path: string | undefined
        }[]
    >()

    useEffect(() => {
        crumbs.unshift({ name: 'Home', path: '' })
        setBreadcrumbs(crumbs)
    }, [crumbs])

    // TODO :
    // simply pass breadcrumbs name and page into the props... and use location.pahtname if nothing is given
    // - fix breadcrumbs on page reloading / nav next prev.
    // - improve breadcrumbs pathing -> ex for a product it should always follow the pattern
    //      Home / Categories[product.category] / product.title (max lenght 25)
    return (
        <div className="px-2 breadcrumbs text-sm text-sky-950">
            <ul>
                {breadcrumbs?.map((crumb, index) => (
                    <li key={'breadcrumbs_' + crumb.name + '_' + index}>
                        <Link to={'' + crumb.path}>{crumb.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Breadcrumbs
