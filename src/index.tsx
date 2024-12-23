import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LandingPage from './page/Landing'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './page/Layout'
import CategoriesPage from './page/Categories'
import ProductPage from './page/Product'
import NotFound from './page/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="product/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
