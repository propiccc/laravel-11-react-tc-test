import { PlusIcon } from '@heroicons/react/24/solid'
import React from 'react'
function Add({ onClick }) {
    return (
        <>
            <button className='flex items-center border-[1px] border-[#00114d] hover:bg-[#00114d] hover:text-white text-[#00114d] transition-all duration-200 p-1 justify-center cursor-pointer rounded-sm active:scale-95' onClick={onClick}>
                <div className="h-full flex justify-center items-center ">
                    <span className='mx-1 text-sm font-semibold'>Add</span>
                    <PlusIcon className='h-[15px] w-[15px] font-bold' />
                </div>
            </button>
        </>
    )
}

export default Add
