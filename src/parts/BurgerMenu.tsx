import React from 'react'
import { Link } from 'react-router-dom'

interface BurgerMenuProperties {
    menuItems: { name: string; link: string }[]
}

const BurgerMenu: React.FC<BurgerMenuProperties> = ({ menuItems }) => {
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
                        <button className="p-0 no-underline">
                            <a className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                chat_bubble
                            </a>
                        </button>
                        <button className="p-0 no-underline">
                            <a className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                person
                            </a>
                        </button>
                        <button className="p-0 no-underline">
                            <a className="btn btn-ghost p-0 text-sky-950 text-3xl no-underline mx-0.5">
                                shopping_cart
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BurgerMenu
