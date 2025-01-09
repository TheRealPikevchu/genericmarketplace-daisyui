import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface BurgerMenuProperties {
    menuItems: { name: string; link: string }[]
}

const BurgerMenu: React.FC<BurgerMenuProperties> = ({ menuItems }) => {
    return (
        <>
            <div className="bg-orange-500 lg:hidden">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="p-0 btn btn-ghost"
                    >
                        <span className="p-0 no-arrow material-symbols-outlined text-3xl">
                            menu
                        </span>
                    </div>
                    <nav>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {menuItems.map((item) => (
                                <li key={'menu-item_' + item.name}>
                                    <Link to={item.link}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default BurgerMenu
