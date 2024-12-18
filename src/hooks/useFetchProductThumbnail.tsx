import React, { useState, useEffect } from 'react'
import axios from 'axios'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/products/'
interface UseFetchProductThumbnailOptions {
    thumbPath: string | undefined
    dummy?: boolean
}

const useFetchProductThumbnail = ({
    thumbPath,
    dummy = false,
}: UseFetchProductThumbnailOptions) => {
    const [hasThumbLoaded, setHasLoaded] = useState(false)
    const [hasThumbError, setHasError] = useState(false)
    const [hasStartedInitialThumbFetch, setHasStartedInitialFetch] =
        useState(false)

    useEffect(() => {
        setHasStartedInitialFetch(true)
        setHasLoaded(false)
        setHasError(false)

        const image = new Image()
        try {
            if (thumbPath === undefined) {
                throw new Error('Unable to fetch undefinded thumbnail.')
            }

            image.src = thumbPath

            const handleError = () => {
                setHasError(true)
            }

            const handleLoad = () => {
                setHasLoaded(true)
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
    }, [thumbPath])

    return { hasThumbLoaded, hasThumbError, hasStartedInitialThumbFetch }
}

export default useFetchProductThumbnail
