const Search = ({ query, updateQuery, setHidden }) => {
    return (
        <div className='p-2 bg-white border-solid border-gray-100 border-2'>
            <input onFocus={() => setHidden(false)} onBlur={() => setTimeout(setHidden,100,true)} className='outline-none bg-transparent' placeholder='search...' value={query} onChange={e => updateQuery(e.target.value)} />
        </div>
    )
}

export default Search;