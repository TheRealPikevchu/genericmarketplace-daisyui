import React from 'react'

interface CarouselCardProperties {
    id: number
    slideCount: number
    title: string
    headline?: string
    noButton?: boolean
    buttonText?: string
    link?: string
    backgroundColor?: string
    backgroundImage?: string
    delay?: number
}

const CarouselCard: React.FC<CarouselCardProperties> = ({
    id,
    slideCount,
    title,
    headline,
    noButton,
    buttonText,
    link,
    backgroundColor = '#f97316',
    backgroundImage,
    delay,
}) => {
    const backgroundColorTag = backgroundImage
        ? `bg-gradient-to-t to-transparent from-[${backgroundColor}]`
        : `bg-[${backgroundColor}]`

    const prevID = id - 1 > 0 ? id - 1 : slideCount
    const nextID = id + 1 <= slideCount ? id + 1 : 1

    return (
        <div id={'slide' + id} className="carousel-item relative w-full">
            <img
                src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
                className="w-full"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={'#slide' + prevID} className="btn btn-circle">
                    ❮
                </a>
                <a href={'#slide' + nextID} className="btn btn-circle">
                    ❯
                </a>
            </div>
        </div>
    )
}

export default CarouselCard
