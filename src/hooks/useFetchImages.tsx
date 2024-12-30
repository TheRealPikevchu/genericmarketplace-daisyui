import React, { useState, useEffect } from 'react'

interface UseFetchImagesOptions {
    src: string[] | undefined
}

const useFetchImages = ({ src }: UseFetchImagesOptions) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false)

    useEffect(() => {
        setHasStartedInitialFetch(true)
        src?.forEach((path, pathIndex) => {
            setIsLoading(true)

            setHasError(false)

            const image = new Image()
            try {
                if (src === undefined) {
                    throw new Error('Unable to fetch undefinded image.')
                }

                image.src = path

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
        })
    }, [src])

    return { isLoading, hasError, hasStartedInitialFetch }
}

export default useFetchImages
