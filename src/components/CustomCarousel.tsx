import React, { PropsWithChildren, ReactNode } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import CarouselCardProperties from '../interface/CarouselCardProperties'
import CarouselCard from './CarouselCard'

interface CarouselProperties {
    cards: Array<CarouselCardProperties>
    autoplay?: boolean
    interval?: number
    size?: string
}

const CustomCarousel: React.FC<CarouselProperties> = ({
    cards,
    interval,
    autoplay = true,
    size,
}) => {
    return (
        <div
            className={
                'max-w-screen-xl rounded-3xl bg-white m-0 overflow-hidden ' +
                size
            }
        >
            <Carousel
                autoPlay={autoplay}
                infiniteLoop
                interval={interval}
                showThumbs={false}
                showStatus={false}
            >
                {cards.map((card) => {
                    return (
                        <CarouselCard
                            title={card.title}
                            backgroundColor={card.backgroundColor}
                            backgroundImage={card.backgroundImage}
                            buttonText={card.buttonText}
                            headline={card.headline}
                            link={card.link}
                            noButton={card.noButton}
                        />
                    )
                })}
            </Carousel>
        </div>
    )
}

export default CustomCarousel
