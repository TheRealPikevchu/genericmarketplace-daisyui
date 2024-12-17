import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import paths from '../data/paths'

interface BreadcrumbsProperties {}

const Breadcrumbs: React.FC<BreadcrumbsProperties> = () => {
    const location = useLocation()
    const locations = location.pathname.split('/').slice(1)

    return (
        <div className="px-2 breadcrumbs text-sm text-sky-950">
            <ul>
                <li key="breadcrumbs_home">
                    <Link to="/">Home</Link>
                </li>
                {locations.map((location) => (
                    <li key={'breadcrumbs_' + location}>
                        <Link to={'/' + location}>
                            {paths.find((path) => path.path === location)?.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Breadcrumbs
