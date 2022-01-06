import React,{ useState, useEffect } from 'react'
import {Search,Suggestion} from "../";
import * as service from "../../services";

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
            const data = await service.getSuggestions(query);
            const end = window.performance.now();
            const delta = end - start;
            setMessage(`fetched in ~${(delta/1000).toFixed(2)}s.`);
            setSuggestions(data);
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
        const data = await service.postQuery(item);
        setMessage(data);
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
                <Search setHidden={setIsHidden} query={search} updateQuery={handleChange} />
                <Suggestion hidden={hidden} items={suggestions} valid={!!search.length} updateCount={handleClick}/>
            </div>
        </div>
    )
}

export default Home
