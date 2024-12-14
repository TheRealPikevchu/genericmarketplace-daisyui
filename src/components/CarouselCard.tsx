import React from 'react'
import CarouselCardProperties from '../interface/CarouselCardProperties'

const CarouselCard: React.FC<CarouselCardProperties> = ({
    title,
    headline,
    noButton,
    buttonText,
    link,
    backgroundColor = '#f97316',
    backgroundImage,
}) => {
    const backgroundColorTag = backgroundImage
        ? `bg-gradient-to-t to-transparent from-[${backgroundColor}]`
        : `bg-[${backgroundColor}]`

    return (
        <div className="p-0 rounded-3xl items-start content-start relative w-full h-full ">
            <div
                className={
                    'toto ' +
                    // 'min-h-72 max-h80' + backgroundImage &&
                    // `bg-[${backgroundColor}]`
                    backgroundColorTag
                }
            >
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt="highlight-card-image"
                        className="w-full h-full object-cover"
                    />
                )}
                <div
                    className={
                        'absolute inset-x bottom-4 flex flex-col p-3 full-width gap-y-2 ' +
                        backgroundColorTag
                    }
                >
                    <h3 className="text-sky-950 text-start text-base archivo-black">
                        {title}
                    </h3>
                    <p className="text-sky-950 text-start text-base">
                        {headline}
                    </p>
                    {!noButton && (
                        <button className="btn cta">{buttonText}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CarouselCard
