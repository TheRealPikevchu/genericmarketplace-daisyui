import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import paths from '../data/paths'

interface BreadcrumbsProperties {
    path?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProperties> = ({ path }) => {
    const location = useLocation()
    const locations = path
        ? path.split('/')
        : location.pathname.split('/').slice(1)

    // TODO :
    // - fix breadcrumbs on page reloading / nav next prev.
    // - improve breadcrumbs pathing -> ex for a product it should always follow the pattern
    //      Home / Categories[product.category] / product.title (max lenght 25)
    return (
        <div className="px-2 breadcrumbs text-sm text-sky-950">
            <ul>
                <li key="breadcrumbs_home">
                    <Link to="/">Home</Link>
                </li>
                {locations.map((location) => (
                    <li key={'breadcrumbs_' + location}>
                        <Link to={'/' + location}>
                            {path
                                ? location
                                : paths.find(
                                      (genericPath) =>
                                          genericPath.path === location
                                  )?.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Breadcrumbs
