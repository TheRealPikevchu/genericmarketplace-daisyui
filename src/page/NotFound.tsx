import React from 'react'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-sky-950">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="text-2xl mt-4 text-center">
                Oops! we searched through our numerous{' '}
                <Link to="/categories" className="text-orange-500 underline">
                    categories
                </Link>{' '}
                and{' '}
                <Link to="/products" className="text-orange-500 underline">
                    products
                </Link>{' '}
                but couldn't find what you are looking for... Let's go back home
                !
            </p>
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600"
            >
                Go Back Home
            </Link>
        </div>
    )
}

export default NotFound
