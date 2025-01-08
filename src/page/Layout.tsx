import React, { useEffect } from 'react'
import '../index.css'
import Header from '../parts/Header'
import Footer from '../parts/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTopButton'

interface LayoutProperties {}

const Layout: React.FC<LayoutProperties> = () => {
    const location = useLocation()

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [location.pathname])

    return (
        <>
            <div className="flex bg-white flex-col items-center">
                <Header
                    specialOffer="Flash offer ! See our best deals by clicking"
                    specialOfferLink="/products"
                />
                <div className="flex flex-col py-4 px-8 gap-y-3 w-full max-w-6xl min-h-screen">
                    <Outlet />
                </div>
                {/* Add a scroll to top button  */}
                <Footer />
            </div>
            <ScrollToTop />
        </>
    )
}

export default Layout
