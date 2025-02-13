import React, { useState } from 'react'
import { PlayIcon } from '@heroicons/react/24/solid';
function DropdownMenu({ icon, toggle, name, menu, HeroIcons }) {

    const [isOpen, setIsOpen] = useState(false);

    //  * Function
    const IconsKu = ({ icon, Path = "" }) => {
        const IconComponent = HeroIcons[icon];
        return IconComponent ? <IconComponent /> : null;
    };

    return (
        <>
            <div onClick={() => { setIsOpen(e => !e) }} className={`flex items-center bg-[#00092b] border-b-[1px] border-gray-400  text-gray-300 h-12 transition-all duration-300 rounded-md rounded-b-none hover:text-blue-500 cursor-pointer select-none`}>
                <div className="flex justify-center h-8 w-8 p-1 text-white items-center">
                    <IconsKu icon={icon} />
                </div>
                {toggle ? (
                    <div className="flex w-full items-center justify-between">
                        <div className="w-full flex text-center h-full items-center text-sm" >{name}</div>
                        <div className='mr-2'><PlayIcon className={`${isOpen ? 'rotate-90' : 'rotate-0'} h-[10px] transition-all duration-300 text-white`} /></div>
                    </div>
                ) : null}</div>
            {isOpen ? (
                <div className="flex flex-col mb-2">
                    {menu}
                </div>
            ) : null}
        </>
    );
}

export default DropdownMenu

