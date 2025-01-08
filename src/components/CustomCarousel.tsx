import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import CarouselCardProperties from '../interface/CarouselCardProperties'
import CarouselCard from './CarouselCard'

interface CarouselProperties {
    cards: Array<CarouselCardProperties>
    autoplay?: boolean
    interval?: number
    size?: string
    externalControls?: boolean
}

const CarouselPresenter: React.FC<CarouselProperties> = ({
    cards,
    interval,
    autoplay = true,
    size,
    externalControls,
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const [pause, setPause] = useState(autoplay)

    const next = () => setSelectedIndex((prev) => (prev + 1) % cards.length)
    const prev = () =>
        setSelectedIndex((prev) => (prev - 1 + cards.length) % cards.length)
    const switchPause = () => setPause((isPaused) => !isPaused)

    return (
        <div>
            <div
                className={
                    'max-w-screen-xl rounded-3xl bg-white m-0 overflow-hidden shadow-xl ' +
                    size
                }
            >
                <Carousel
                    autoPlay={pause}
                    infiniteLoop
                    interval={interval}
                    showThumbs={false}
                    showStatus={false}
                    showArrows={!externalControls}
                    selectedItem={selectedIndex}
                    className={size}
                >
                    {cards.map((card, cardIndex) => {
                        return (
                            <CarouselCard
                                title={card.title}
                                backgroundColor={card.backgroundColor}
                                backgroundImage={card.backgroundImage}
                                buttonText={card.buttonText}
                                headline={card.headline}
                                link={card.link}
                                noButton={card.noButton}
                                key={'card_' + cardIndex}
                            />
                        )
                    })}
                </Carousel>
            </div>
            {externalControls && (
                <div className="flex flex-row justify-center gap-x-3 my-2">
                    <button
                        onClick={prev}
                        className="btn btn-circle btn-xs bg-sky-950"
                    >
                        <span className="material-symbols-outlined text-white text-center text-sm">
                            chevron_left
                        </span>
                    </button>
                    <button
                        onClick={switchPause}
                        className="btn btn-circle btn-xs bg-sky-950"
                    >
                        {pause ? (
                            <span className="material-symbols-outlined text-white text-center text-sm">
                                pause
                            </span>
                        ) : (
                            <span className="material-symbols-outlined text-white text-center text-sm">
                                play_arrow
                            </span>
                        )}
                    </button>
                    <button
                        onClick={next}
                        className="btn btn-circle btn-xs bg-sky-950"
                    >
                        <span className="material-symbols-outlined text-white text-center text-sm">
                            chevron_right
                        </span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default CarouselPresenter
