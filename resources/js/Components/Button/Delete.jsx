import { TrashIcon } from '@heroicons/react/24/solid'
import React from 'react'
function Delete({ onClick }) {
    return (
        <>
            <button className='flex items-center text-white bg-red-600 transition-all duration-200 py-1 px-2 justify-center cursor-pointer rounded-sm active:scale-95' onClick={onClick}>
                <TrashIcon className='w-[15px] h-[15px]' />
                <span className='text-sm font-semibold mr-1'>Delete</span>
            </button>
        </>
    )
}

export default Delete
