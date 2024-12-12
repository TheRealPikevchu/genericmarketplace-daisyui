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
        <div id="Header" className="flex flex-col items-center">
            {specialOffer && (
                <div
                    id="SpecialOffer"
                    className="flex flex-col py-1.5 w-full bg-sky-950"
                >
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
            <div
                id="NavigationMenu"
                className="md:hidden flex flex-col w-full bg-orange-500"
            >
                <div id="MainMenu" className="flex flex-col pb-3 text-sky-950">
                    <div id="LinkSection">
                        <BurgerMenu
                            menuItems={[
                                'Categories',
                                'Hot deals',
                                'New products',
                                'Second hand',
                                'Services',
                            ]}
                        />
                    </div>
                    <div id="SearchSection" className="px-4">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
