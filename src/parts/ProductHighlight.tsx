import React from 'react'
import CustomCarousel from '../components/CustomCarousel'

interface ProductHighlightProperties {}

const ProductHighlight: React.FC<ProductHighlightProperties> = () => {
    return (
        <div className="px-8 py-4 bg-white">
            <CustomCarousel
                interval={5000}
                size="min-h-72 max-h-80"
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
                    },
                    {
                        title: 'Check out this flash offer!',
                        headline:
                            'Get ready for christmas with this super dupper sale.',
                        backgroundColor: '#fac584',
                        backgroundImage: '../assets/gift-box.jpg',
                        buttonText: 'View offer',
                    },
                ]}
            />
        </div>
    )
}

export default ProductHighlight
