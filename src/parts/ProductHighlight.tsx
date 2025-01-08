import React from 'react'
import CarouselPresenter from '../components/CustomCarousel'

const HighlightCarousel: React.FC = () => {
    return (
        <div>
            <CarouselPresenter
                interval={5000}
                size="min-h-72 max-h-80"
                externalControls
                cards={[
                    {
                        title: 'Welcome to GenericMarketplace.com !',
                        headline:
                            'The number one shopping website just for you.',
                        backgroundColor: '#f97316',
                        noButton: true,
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
                            'Get ready for christmas with this super dupper sale.',
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
