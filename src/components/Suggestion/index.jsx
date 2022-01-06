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

export default Suggestion;