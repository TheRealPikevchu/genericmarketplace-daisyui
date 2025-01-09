import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProperties {}

const SearchBar: React.FC<SearchBarProperties> = () => {
    const navigate = useNavigate()

    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    const handleSearchSumbit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formSearchQuery = formData.get('searchQuery') as string
        setSearchQuery(formSearchQuery)
        navigate(`/products?search=${formSearchQuery}`)
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [searchQuery])

    return (
        <form onSubmit={handleSearchSumbit}>
            <label className="input input-bordered flex items-center gap-2 px-4 py-3 bg-white">
                <input
                    id="searchQuery"
                    name="searchQuery"
                    type="text"
                    className="grow text-sky-950 placeholder-slate-400 text-sm"
                    placeholder="search for an item..."
                    required
                />
                <span className="material-symbols-outlined text-xl text-sky-950">
                    search
                </span>
            </label>
        </form>
    )
}

export default SearchBar
