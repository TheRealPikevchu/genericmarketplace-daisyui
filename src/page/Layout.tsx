import React from 'react'
import '../index.css'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import { Outlet, useLocation } from 'react-router-dom'

interface LayoutProperties {}

const Layout: React.FC<LayoutProperties> = () => {
    return (
        <div className="bg-white">
            <Header
                specialOffer="Flash offer ! See our best deals by clicking"
                specialOfferLink="http://www.google.fr"
            />
            <Outlet />
            {/* Add a scroll to top button  */}
            <Footer />
        </div>
    )
}

export default Layout
