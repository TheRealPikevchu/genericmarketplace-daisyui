import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './parts/Header'
import ProductHighlight from './parts/ProductHighlight'
import LandingPage from './page/Landing'
import Footer from './parts/Footer'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <div className="bg-white">
            <Header
                specialOffer="Flash offer ! See our best deals by clicking"
                specialOfferLink="http://www.google.fr"
            />
            <LandingPage />
            <Footer />
        </div>
    </React.StrictMode>
)
