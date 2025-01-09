import React, { useEffect, useState } from 'react'
import BurgerMenu from '../components/BurgerMenu'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import useGetCart from '../hooks/useGetCart'
import useFetchAuth from '../hooks/useFetchAuth'
import LoadedImage from '../components/LoadedImage'

interface HeaderProperties {
    specialOffer?: string
    specialOfferLink?: string
}

const BurgerMenuItems = [
    { name: 'Newest', link: 'products?newest' },
    { name: 'All products', link: 'products?category=all' },
    { name: 'Categories', link: 'categories' },
    { name: 'Groceries', link: 'products?category=groceries' },
]

const Header: React.FC<HeaderProperties> = ({
    specialOffer,
    specialOfferLink,
}) => {
    const [storedCart] = useGetCart()

    const [cartCount, setCartCount] = useState<number>(0)

    const { auth, isLoading, error } = useFetchAuth({})

    useEffect(() => {
        if (storedCart && storedCart.length > 0) {
            setCartCount(
                storedCart.reduce((total, current) => {
                    return current.quantity + total
                }, 0)
            )
        }
    }, [storedCart])
    return (
        <div className="sticky top-0 z-50 flex flex-col items-center w-full">
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
            <div
                id="sm-header"
                className="md:hidden flex flex-col w-full bg-orange-500 px-4 py-3"
            >
                <div className="flex flex-col text-sky-950">
                    <div className="navbar flex flex-row">
                        <div className="navbar-start flex flex-row">
                            <BurgerMenu menuItems={BurgerMenuItems} />
                            <div className="flex flex-row items-center justify-around">
                                <div className="flex flex-row items-center text-sky-950">
                                    <Link
                                        to="/"
                                        className="p-0 btn btn-ghost text-xl"
                                    >
                                        <img
                                            src={'../assets/logo__small.png'}
                                            alt="logo"
                                            width="42"
                                            height="42"
                                        />
                                        <p className="archivo-black text-xs text-sky-950">
                                            GenericMarketplace
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="flex flex-row material-symbols-outlined">
                                {/* <button className="p-0 no-underline">
                                                    <a className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                                        chat_bubble
                                                    </a>
                                                </button> */}
                                <button className="p-0 no-underline">
                                    <Link to="login">
                                        {!isLoading &&
                                            (auth ? (
                                                <LoadedImage
                                                    key={auth.username + '_pp'}
                                                    src={auth.image}
                                                    alt={auth.username + '_pp'}
                                                    layout="w-8 aspect-square rounded-full bg-white"
                                                />
                                            ) : (
                                                <span className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                                    person
                                                </span>
                                            ))}
                                    </Link>
                                </button>
                                <button className="relative p-0 no-underline">
                                    {cartCount > 0 && (
                                        <div className="indicator absolute top-1/4 right-1 pointer-events-none">
                                            <span className="numeric px-1 indicator-item badge bg-green-500 border-green-500 font-bold text-white">
                                                {cartCount}
                                            </span>
                                        </div>
                                    )}
                                    <Link
                                        to="/cart"
                                        className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5"
                                    >
                                        shopping_cart
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 w-full max-w-4xl">
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div
                id="md&lg-header"
                className="md:flex hidden flex-col w-full items-center bg-orange-500 px-4 py-3"
            >
                <div className="flex flex-col w-full max-w-6xl justify-center items-center text-sky-950">
                    <div className="w-full flex flex-row justify-between">
                        <div className="flex flex-row justify-around w-4/12 min-w-56">
                            <div className="flex flex-row items-center justify-center">
                                <BurgerMenu menuItems={BurgerMenuItems} />
                                <div className="flex flex-row items-center text-sky-950">
                                    <Link
                                        to="/"
                                        className="p-0 btn btn-ghost text-xl"
                                    >
                                        <img
                                            src={'../assets/logo__small.png'}
                                            alt="logo"
                                            width="42"
                                            height="42"
                                        />
                                        <p className="archivo-black text-xs text-sky-950">
                                            GenericMarketplace
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="w-full px-4">
                            <SearchBar />
                        </div>
                        <div className="w-4/12 min-w-56">
                            <div className="flex flex-row justify-end material-symbols-outlined gap-3">
                                {/* <button className="p-0 no-underline">
                                                    <a className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                                        chat_bubble
                                                    </a>
                                                </button> */}
                                <button className="p-0 no-underline">
                                    <Link to="login">
                                        {!isLoading &&
                                            (auth ? (
                                                <LoadedImage
                                                    key={auth.username + '_pp'}
                                                    src={auth.image}
                                                    alt={auth.username + '_pp'}
                                                    layout="w-8 aspect-square rounded-full bg-white"
                                                />
                                            ) : (
                                                <span className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                                    person
                                                </span>
                                            ))}
                                    </Link>
                                </button>
                                <button className="relative p-0 no-underline">
                                    {cartCount > 0 && (
                                        <div className="indicator absolute top-1/4 right-1 pointer-events-none">
                                            <span className="numeric px-1 indicator-item badge bg-green-500 border-green-500 font-bold text-white">
                                                {cartCount}
                                            </span>
                                        </div>
                                    )}
                                    <Link
                                        to="/cart"
                                        className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5"
                                    >
                                        shopping_cart
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex w-full max-w-5xl pt-3">
                    <ul className="flex flex-row w-full justify-between text-sky-950">
                        {BurgerMenuItems.map((item) => (
                            <li key={'menu-item_' + item.name}>
                                <Link
                                    to={item.link}
                                    className="hover:underline"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
