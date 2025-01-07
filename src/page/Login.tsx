import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import useFetchAuth from '../hooks/useFetchAuth'
import { useLocalStorage } from '@uidotdev/usehooks'
import LoadedImage from '../components/LoadedImage'

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [token, setToken] = useLocalStorage<string | null>('accessToken')
    const [errorMessage, setErrorMessage] = useState<string>()

    const { auth, isLoading, error } = useFetchAuth({
        username: username,
        password: password,
    })

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const username = formData.get('username') as string
        const password = formData.get('password') as string
        setUsername(username)
        setPassword(password)
    }

    useEffect(() => {
        if (error?.message !== 'Invalid/Expired Token!')
            setErrorMessage(error?.message)
    }, [error])

    const handleDisconnect = () => {
        setToken(null)
    }

    return (
        <div className="flex flex-col py-4 px-8 gap-y-3">
            <Breadcrumbs />
            <div className="flex flex-col items-center justify-center">
                {!isLoading && !auth ? (
                    <div className="w-full max-w-sm p-6">
                        <h1 className="text-center mb-3">Login</h1>
                        {(username || password) && errorMessage && (
                            <div className="mb-4 text-sm text-red-500">
                                {errorMessage}
                            </div>
                        )}
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="form-control">
                                <label htmlFor="username" className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    autoComplete="username"
                                    placeholder="Enter your username"
                                    className="input input-bordered w-full bg-white text-sky-950"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full bg-white text-sky-950"
                                    required
                                />
                            </div>
                            <div className="form-control mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary bg-sky-950 border-sky-950 text-white w-full"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="w-full max-w-sm p-6">
                        <div className="flex flex-row items-center justify-between mb-3">
                            <h1>Hello {auth?.firstName}!</h1>
                            <LoadedImage
                                src={auth?.image}
                                alt={auth?.username + '_pp'}
                                layout="aspect-square rounded-full w-12"
                            />
                        </div>
                        <button
                            className="btn btn-primary bg-sky-950 border-sky-950 text-white w-full"
                            onClick={() => handleDisconnect()}
                        >
                            Disconnect
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginPage
