import React,{ useState, useEffect } from 'react'
import axios from "axios";

const http = axios.create({
    // baseURL:process.env.REACT_APP_SERVER
    baseURL: "http://localhost:5000"
})

const Search = ({ query, updateQuery, unsetHidden }) => {
    return (
        <div className='p-2 bg-white border-solid border-gray-100 border-2'>
            <input onFocus={unsetHidden} className='outline-none bg-transparent' placeholder='search...' value={query} onChange={e => updateQuery(e.target.value)} />
        </div>
    )
}

const Suggestion = ({items,valid,updateCount,hidden}) => {
    return (
        <div className='absolute top-full left-0 w-full'>
            <div className='relative w-full max-h-full overflow-hidden overflow-y-auto'>
                {
                    hidden ? null : items.length ? <ul className='border-solid border-2 border-gray-100'>
                        {items.map(item => {
                            return (
                                <li onClick={() => updateCount(item)} key={item} className='bg-white px-2 py-2 cursor-pointer hover:bg-gray-100 border-gray-100 border-b-solid border-b-2'>
                                    {item}
                                </li>
                            )
                        })}
                    </ul> : valid ? <p className='mt-8 text-center'>cannot find...</p> : null
                }
            </div>
        </div>
    )
}

const Home = () => {
    const [search,setSearch] = useState("");
    const [message,setMessage] = useState("welcome to the search app!");
    const [loading,setLoading] = useState(false);
    const [suggestions,setSuggestions] = useState([]);
    const [hidden,setIsHidden] = useState(false);

    const getSuggestions = async (query) => {
        if(!query?.length) return setSuggestions([]);
        setLoading(true);
        try {
            const start = window.performance.now();
            const response = await http.get("/suggest",{params:{q:query}});
            const end = window.performance.now();
            const delta = end - start;
            setMessage(`fetched in ${(delta/1000).toFixed(2)}s.`);
            const data = response.data;
            setSuggestions(data.data);
        }catch(err) {
            setMessage(err.message);
        }finally {
            setLoading(false);
        }
    }

    const handleChange = (value) => {
        setSearch(value);
    }

    useEffect(() => {
        getSuggestions(search);
    }, [search])

    const handleClick = async (item) => {
        const response = await http.get("/search",{params:{q:item}});
        const data = response.data;
        setMessage(data.data);
        setIsHidden(true);
    }

    return (
        <div className='absolute top-1/2 left-1/2'>
            <div className='relative -translate-x-1/2 -translate-y-1/2'>
                {loading || message ?<div className='text-center min-w-full -translate-x-1/2 -translate-y-full absolute left-1/2 pb-8 text-muted top-0'>
                    {!loading ? <p>
                        {message}
                    </p> : <span>loading...</span>}
                </div> : null}
                <Search unsetHidden={() => setIsHidden(false)} query={search} updateQuery={handleChange} />
                <Suggestion hidden={hidden} items={suggestions} valid={!!search.length} updateCount={handleClick}/>
            </div>
        </div>
    )
}

export default Home
