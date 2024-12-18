import React, { useState, useEffect } from 'react'

interface UseFetchImageOptions {
    src: string | undefined
}

const useFetchImage = ({ src }: UseFetchImageOptions) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false)

    useEffect(() => {
        setHasStartedInitialFetch(true)
        setIsLoading(true)
        setHasError(false)

        const image = new Image()
        try {
            if (src === undefined) {
                throw new Error('Unable to fetch undefined image.')
            }

            image.src = src

            const handleError = () => {
                setHasError(true)
            }

            const handleLoad = () => {
                setIsLoading(false)
                setHasError(false)
            }

            image.onerror = handleError
            image.onload = handleLoad
            return () => {
                image.removeEventListener('error', handleError)
                image.removeEventListener('load', handleLoad)
            }
        } catch (error) {
            setHasError(true)
        }
    }, [src])

    return { isLoading, hasError, hasStartedInitialFetch }
}

export default useFetchImage
