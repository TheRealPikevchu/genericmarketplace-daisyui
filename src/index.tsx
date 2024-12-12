import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Header from './parts/Header'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Header
            specialOffer="Flash offer ! See our best deals by clicking"
            specialOfferLink="http://www.google.fr"
        />
    </React.StrictMode>
)
