import React from 'react'
function Create({ onClick, Disable = false }) {
    return (
        <>
            <button type='submit' disabled={Disable} className='flex items-center hover:bg-blue-700 hover:text-white bg-blue-300 text-blue-700 transition-all duration-200 py-1 justify-center px-2 cursor-pointer rounded-sm active:scale-95' onClick={onClick}>
                <div className="h-full flex justify-center items-center">
                    <span className='px-1'>Create</span>
                </div>
            </button>
        </>
    )
}

export default Create
