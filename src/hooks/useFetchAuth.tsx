import React, { useEffect, useState } from 'react'
import useDummy from '../data/dummyjson'
import axios from 'axios'
import { useLocalStorage } from '@uidotdev/usehooks'

const defaultURL = ''
const debugURL = 'https://dummyjson.com/auth/'

interface UseFetchAuthProperties {
    username?: string
    password?: string
}

interface UseFetchAuthResponse {
    id: string
    username: string
    email: string
    firstName: string
    lastName: string
    gender: string
    image: string
    accessToken: string
    refreshToken: string
}

const useFetchAuth = ({ username, password }: UseFetchAuthProperties) => {
    const [auth, setAuth] = useState<UseFetchAuthResponse | null>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [token, setToken] = useLocalStorage<string>('accessToken')

    const me = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get(
                `${useDummy ? debugURL : defaultURL}me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const responseAuth = response.data
            setAuth(responseAuth)

            setError(null)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(
                    new Error(error.response?.data?.message || 'Unknown error')
                )
            } else {
                setError(error as Error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchAuth = async () => {
            setIsLoading(true)
            try {
                if (!token) {
                    const response = await axios.post(
                        `${useDummy ? debugURL : defaultURL}login`,
                        {
                            username,
                            password,
                        }
                    )
                    const responseAuth = response.data
                    setAuth(responseAuth)
                    setToken(responseAuth.accessToken)
                } else {
                    me()
                }
                setError(null)
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(
                        new Error(
                            error.response?.data?.message || 'Unknown error'
                        )
                    )
                } else {
                    setError(error as Error)
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchAuth()
    }, [username, password])

    useEffect(() => {
        if (token) {
            me()
        } else {
            setAuth(null)
        }
    }, [token])

    return { auth, isLoading, error }
}

export default useFetchAuth
