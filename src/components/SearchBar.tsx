import React from 'react'

interface SearchBarProperties {}

const SearchBar: React.FC<SearchBarProperties> = () => {
    return (
        <label className="input input-bordered flex items-center gap-2 px-4 py-3 bg-white">
            <input
                type="text"
                className="grow text-sky-950 placeholder-slate-400 text-sm"
                placeholder="search for an item..."
            />
            <span className="material-symbols-outlined text-xl text-sky-950">
                search
            </span>
        </label>
    )
}

export default SearchBar
