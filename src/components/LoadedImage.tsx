import React from 'react'
import useFetchImage from '../hooks/useFetchImage'

interface LoadedImageProperties {
    src: string | undefined
    alt: string | undefined
    layout?: string
}

const LoadedImage: React.FC<LoadedImageProperties> = ({ src, alt, layout }) => {
    let { isLoading, hasError } = useFetchImage({ src: src })

    if (src === undefined) {
        hasError = true
    }

    return (
        <>
            {isLoading ? (
                <div className={`skeleton + ${layout}`}></div>
            ) : (
                <img src={src} alt={alt} className={layout}></img>
            )}
        </>
    )
}

export default LoadedImage
