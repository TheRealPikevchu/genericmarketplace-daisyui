import React from 'react'
import CarouselCardProperties from '../interface/CarouselCardProperties'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const getGradientToAlphaDiv = (r: number, g: number, b: number) => styled.div`
    background: rgba(0, 0, 0, 0);
    background: linear-gradient(
        0deg,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 0.9) 80%,
        rgba(${r}, ${g}, ${b}, 0) 100%
    );
`

const getHorizontalGradientToAlphaDiv = (
    r: number,
    g: number,
    b: number
) => styled.div`
    background: rgba(0, 0, 0, 0);
    background: linear-gradient(
        90deg,
        rgba(${r}, ${g}, ${b}, 1) 0%,
        rgba(${r}, ${g}, ${b}, 1) 50%,
        rgba(${r}, ${g}, ${b}, 0.9) 60%,
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

    const GradientDiv = getGradientToAlphaDiv(
        parseInt(backgroundColor.substring(1, 3), 16),
        parseInt(backgroundColor.substring(3, 5), 16),
        parseInt(backgroundColor.substring(5, 7), 16)
    )

    const HorizontalGradientDiv = getHorizontalGradientToAlphaDiv(
        parseInt(backgroundColor.substring(1, 3), 16),
        parseInt(backgroundColor.substring(3, 5), 16),
        parseInt(backgroundColor.substring(5, 7), 16)
    )

    return (
        <>
            <BackgroundColorDiv className="flex md:hidden p-0 m-0 rounded-3xl items-start content-start w-full h-full">
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt="highlight-card-image"
                        className="w-full aspect-square object-cover"
                    />
                )}
                <GradientDiv className="absolute inset-x bottom-0 full-width">
                    <div className="p-3 mt-5 mb-10 flex flex-col gap-y-2">
                        <h3 className="text-sky-950 text-start text-base archivo-black">
                            {title}
                        </h3>
                        <p className="text-sky-950 text-start text-base">
                            {headline}
                        </p>
                        {!noButton && link ? (
                            <Link to={link} className="btn cta">
                                {buttonText}
                            </Link>
                        ) : (
                            <div className="h-[48px]"></div>
                        )}
                    </div>
                </GradientDiv>
            </BackgroundColorDiv>
            <BackgroundColorDiv className="hidden md:flex flex-row p-0 m-0 rounded-3xl w-full h-full">
                {backgroundImage ? (
                    <>
                        <div className="w-full"></div>
                        <img
                            src={backgroundImage}
                            alt="highlight-card-image"
                            className="w-1/2 max-h-72 object-cover"
                        />
                        <HorizontalGradientDiv className="absolute left-0 h-full w-full rounded-3xl">
                            <div className="p-6 flex flex-col justify-center h-full gap-y-2">
                                <h3 className="text-sky-950 text-start text-base md:text-xl archivo-black max-w-[80%]">
                                    {title}
                                </h3>
                                <p className="text-sky-950 text-start text-base md:text-lg max-w-[80%]">
                                    {headline}
                                </p>
                                {!noButton && link ? (
                                    <Link to={link} className="btn cta">
                                        {buttonText}
                                    </Link>
                                ) : (
                                    <div className="h-[48px]"></div>
                                )}
                            </div>
                        </HorizontalGradientDiv>
                    </>
                ) : (
                    <HorizontalGradientDiv className="absolute left-0 h-full w-full rounded-3xl">
                        <div className="flex flex-col items-center justify-center h-full gap-y-2">
                            <h3 className="text-sky-950 text-start text-xl archivo-black">
                                {title}
                            </h3>
                            <p className="text-sky-950 text-start text-xl">
                                {headline}
                            </p>
                            {!noButton && link ? (
                                <Link to={link} className="btn cta">
                                    {buttonText}
                                </Link>
                            ) : (
                                <div className="h-[48px]"></div>
                            )}
                        </div>
                    </HorizontalGradientDiv>
                )}
            </BackgroundColorDiv>
        </>
    )
}

export default CarouselCard
