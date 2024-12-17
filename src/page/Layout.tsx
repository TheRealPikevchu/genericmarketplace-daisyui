import React from 'react'
import '../index.css'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import {
    BrowserRouter,
    Routes,
    Route,
    Outlet,
    useLocation,
} from 'react-router-dom'

interface LayoutProperties {}

const Layout: React.FC<LayoutProperties> = () => {
    const location = useLocation()
    const isNotFound = location.pathname === '*'
    return (
        <div className="bg-white">
            <Header
                specialOffer="Flash offer ! See our best deals by clicking"
                specialOfferLink="http://www.google.fr"
            />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
