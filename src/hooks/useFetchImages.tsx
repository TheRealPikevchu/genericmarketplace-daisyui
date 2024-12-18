import React, { useState, useEffect } from 'react'

interface UseFetchImagesOptions {
    src: string[] | undefined
}

const useFetchImages = ({ src }: UseFetchImagesOptions) => {
    const [isLoading, setIsLoading] = useState([true])
    const [hasError, setHasError] = useState([false])
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false)

    useEffect(() => {
        setHasStartedInitialFetch(true)
        src?.forEach((path, pathIndex) => {
            setIsLoading(
                isLoading.map((state, index) =>
                    index === pathIndex ? true : state
                )
            )
            setHasError(
                hasError.map((state, index) =>
                    index === pathIndex ? false : state
                )
            )

            const image = new Image()
            try {
                if (src === undefined) {
                    throw new Error('Unable to fetch undefinded image.')
                }

                image.src = path

                const handleError = () => {
                    setHasError(
                        hasError.map((state, index) =>
                            index === pathIndex ? true : state
                        )
                    )
                }

                const handleLoad = () => {
                    setIsLoading(
                        isLoading.map((state, index) =>
                            index === pathIndex ? false : state
                        )
                    )
                    setHasError(
                        hasError.map((state, index) =>
                            index === pathIndex ? false : state
                        )
                    )
                }

                image.onerror = handleError
                image.onload = handleLoad
                return () => {
                    image.removeEventListener('error', handleError)
                    image.removeEventListener('load', handleLoad)
                }
            } catch (error) {
                setHasError(
                    hasError.map((state, index) =>
                        index === pathIndex ? true : state
                    )
                )
            }
        })
    }, [src])

    return { isLoading, hasError, hasStartedInitialFetch }
}

export default useFetchImages
