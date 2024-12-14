import React from 'react'
import CarouselCardProperties from '../interface/CarouselCardProperties'
import styled from 'styled-components'

const getGradientToAlphaDiv = (r: number, g: number, b: number) => styled.div`
    background: rgba(0, 0, 0, 0);
    background: linear-gradient(
        0deg,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 0.9) 80%,
        rgba(${r}, ${g}, ${b}, 0) 100%
    );
`

const getBackgroundColorDiv = (color: string) => styled.div`
    background-color: ${color};
`

const CarouselCard: React.FC<CarouselCardProperties> = ({
    title,
    headline,
    noButton,
    buttonText,
    link,
    backgroundColor = '#f97316',
    backgroundImage,
}) => {
    const BackgroundColorDiv = getBackgroundColorDiv(backgroundColor)

    backgroundColor.replace('#', '')
    console.log(backgroundColor)

    const GradientDiv = getGradientToAlphaDiv(
        parseInt(backgroundColor.substring(1, 3), 16),
        parseInt(backgroundColor.substring(3, 5), 16),
        parseInt(backgroundColor.substring(5, 7), 16)
    )

    return (
        <BackgroundColorDiv className="p-0 rounded-3xl items-start content-start relative w-full h-full">
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt="highlight-card-image"
                    className="w-full h-full object-cover"
                />
            )}
            <GradientDiv className="absolute inset-x bottom-0 full-width">
                <div className="p-3 my-5 flex flex-col gap-y-2">
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
            </GradientDiv>
        </BackgroundColorDiv>
    )
}

export default CarouselCard
