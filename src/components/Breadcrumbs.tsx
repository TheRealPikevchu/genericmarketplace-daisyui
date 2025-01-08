import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import paths from '../data/paths'
import { useMediaQuery } from '@uidotdev/usehooks'

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

    const isMobile = useMediaQuery('only screen and (max-width : 640px)')

    useEffect(() => {
        let last = crumbs[crumbs.length - 1]
        const tmpCrumbs = crumbs
        if (isMobile && last.name && last.name?.length > 15) {
            last.name = last.name.slice(0, 15)
            last.name += '...'
            tmpCrumbs.pop()
            tmpCrumbs.push(last)
        }
        setBreadcrumbs(tmpCrumbs)
    }, [crumbs, isMobile])

    useEffect(() => {
        crumbs.unshift({ name: 'Home', path: '/' })
        setBreadcrumbs(crumbs)
    }, [crumbs])

    // TODO :
    // simply pass breadcrumbs name and page into the props... and use location.pahtname if nothing is given
    // - fix breadcrumbs on page reloading / nav next prev.
    // - improve breadcrumbs pathing -> ex for a product it should always follow the pattern
    //      Home / Categories[product.category] / product.title (max lenght 25)
    return (
        <div className="max-w-full px-2 breadcrumbs text-sm text-sky-950 overflow-clip">
            <ul>
                {breadcrumbs?.map((crumb, index) => (
                    <li key={'breadcrumbs_' + crumb.name + '_' + index}>
                        <Link
                            to={'' + crumb.path}
                            className={
                                index === breadcrumbs.length - 1
                                    ? 'truncate text-ellipsis max-w-32 md:max-w-none'
                                    : ''
                            }
                        >
                            {crumb.name}{' '}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Breadcrumbs
