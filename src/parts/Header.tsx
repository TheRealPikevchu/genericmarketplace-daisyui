import React from 'react'
import BurgerMenu from './BurgerMenu'
import SearchBar from '../components/SearchBar'

interface HeaderProperties {
    specialOffer?: string
    specialOfferLink?: string
}

const Header: React.FC<HeaderProperties> = ({
    specialOffer,
    specialOfferLink,
}) => {
    return (
        <div className="sticky top-0 z-50 flex flex-col items-center">
            {specialOffer && (
                <div className="flex flex-col py-1.5 w-full bg-sky-950">
                    <p className="text-center text-white text-sm font-thin">
                        {specialOffer}{' '}
                        <a
                            className="underline text-orange-500"
                            href={specialOfferLink}
                        >
                            here
                        </a>
                        .
                    </p>
                </div>
            )}
            <div className="md:hidden flex flex-col w-full bg-orange-500">
                <div className="flex flex-col pb-3 text-sky-950">
                    <div>
                        <BurgerMenu
                            menuItems={[
                                { name: 'Categories', link: 'categories' },
                                { name: 'Hot deals', link: '' },
                                { name: 'New products', link: '' },
                                { name: 'Second hand', link: '' },
                                { name: 'Services', link: '' },
                            ]}
                        />
                    </div>
                    <div className="px-4 max-w-5xl">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
