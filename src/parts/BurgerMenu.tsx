import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useGetCart from '../hooks/useGetCart'
import useFetchAuth from '../hooks/useFetchAuth'
import LoadedImage from '../components/LoadedImage'

interface BurgerMenuProperties {
    menuItems: { name: string; link: string }[]
}

const BurgerMenu: React.FC<BurgerMenuProperties> = ({ menuItems }) => {
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

    // sticky on mobile ?
    return (
        <>
            <div className="navbar bg-base-orange-600 justify-evenly items-center w-full px-4 py-3">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="p-0 btn btn-ghost lg:hidden"
                        >
                            <span className="p-0 no-arrow material-symbols-outlined text-3xl">
                                menu
                            </span>
                        </div>
                        <nav>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-orange-600 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                            >
                                {menuItems.map((item) => (
                                    <li key={'menu-item_' + item.name}>
                                        <Link to={item.link}>{item.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="flex flex-row items-center justify-around py-3 ">
                        <div
                            id="Title"
                            className="flex flex-row items-center text-sky-950"
                        >
                            <Link to="/" className="p-0 btn btn-ghost text-xl">
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
                <div className="navbar-center hidden lg:flex">
                    <nav>
                        <ul className="menu menu-horizontal px-1">
                            {menuItems.map((item) => (
                                <li key={'menu-item_' + item.name}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="navbar-end">
                    <div
                        id="UserMenu"
                        className="flex flex-row material-symbols-outlined"
                    >
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
        </>
    )
}

export default BurgerMenu
