import React from 'react'
import NotFound from '../Asset/NotFound.jpg'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

function DashboardNotFound() {
    return (
        <div class="flex flex-col justify-center items-center bg-white rounded-lg shadow-xl h-full">
            <div className="bg-black flex justify-center">
                <img src={NotFound} alt="" className='w-[100%] h-[200px]' />
            </div>
            <div class="flex justify-center pt-24 pb-12">
                <div class="w-full max-w-xl">
                    <h1 class="text-2xl text-center font-heading font-semibold mb-4">Sorry, the page can't be found</h1>
                    <p class="text-center w-[400px] font-semibold text-gray-600 mb-8">The page you were looking for appears to have been moved, deleted or does not exist.</p>
                    <div class="flex justify-center">
                        <Link to="/system/dashboard" class="bg-blue-700 gap-x-1 hover:bg-blue-700 flex items-center text-white font-semibold py-2 px-4 rounded">
                            <ArrowLeftIcon className='h-[20px] w-[20px] font-bold text-white' />
                            <span>
                                Back to Home
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardNotFound;
