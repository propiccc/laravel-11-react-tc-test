import { PencilIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import React from 'react'
function Edit({ onClick }) {
    return (
        <>
            <button className='flex items-center bg-yellow-400 text-gray-900 transition-all duration-200 py-1 px-2 justify-center cursor-pointer rounded-sm active:scale-95' onClick={onClick}>
                <PencilSquareIcon className='w-[15px] h-[15px]' />
                <span className='text-sm font-semibold mr-1'>Edit</span>
            </button>
        </>
    )
}

export default Edit
