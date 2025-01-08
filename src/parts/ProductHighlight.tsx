import React, { useEffect, useState } from 'react'
import CarouselPresenter from '../components/CustomCarousel'
import useFetchAuth from '../hooks/useFetchAuth'

const defaultWelcomMessage = {
    title: 'Welcome to GenericMarketplace.com !',
    message: 'The number one shopping website made for you.',
}

const HighlightCarousel: React.FC = () => {
    const { auth, isLoading, error } = useFetchAuth({})

    const [welcomeMessage, setWelcomeMessage] = useState<{
        title: string
        message: string
    }>(defaultWelcomMessage)

    useEffect(() => {
        if (!isLoading && !error && auth) {
            setWelcomeMessage({
                title: `Hello ${auth.firstName} !`,
                message:
                    'Welcome back to GenericMarketplace, what are you looking for today ?',
            })
        } else {
            setWelcomeMessage(defaultWelcomMessage)
        }
    }, [auth, isLoading, error])

    return (
        <div>
            <CarouselPresenter
                interval={10000}
                size="h-72"
                externalControls
                cards={[
                    {
                        title: welcomeMessage?.title,
                        headline: welcomeMessage?.message,
                        backgroundColor: '#f97316dd',
                        buttonText: 'Browse products',
                        link: '/products',
                    },
                    {
                        title: 'Amazing product just for you!',
                        headline:
                            'Check out this really good product we selected with care just for you.',
                        backgroundColor: '#fac584',
                        backgroundImage: '../assets/highlight1.jpg',
                        buttonText: 'View product',
                        link: '/product/145',
                    },
                    {
                        title: 'Check out this flash offer!',
                        headline:
                            "Get ready for christmas with this super sale on men's watches.",
                        backgroundColor: '#f5d59e',
                        backgroundImage: '../assets/gift-box.jpg',
                        buttonText: 'View offer',
                        link: '/products?category=mens-watches',
                    },
                ]}
            />
        </div>
    )
}

export default HighlightCarousel
