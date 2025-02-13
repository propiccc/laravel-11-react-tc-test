import { XCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'

function Cancel({ onClick }) {
    return (
        <button type='button' className='flex items-center hover:bg-red-600 hover:text-white bg-red-200 text-red-700 transition-all duration-200 py-1 justify-center px-2 cursor-pointer rounded-sm active:scale-95' onClick={onClick}>
            <div className="h-full flex justify-center items-center">
                <span className='text-md px-1'>Cancel</span>
            </div>
        </button>
    )
}

export default Cancel
