import React from 'react'
import { NavLink } from 'react-router-dom'

function Menu({ href, name, icon, toggle, setToggle, HeroIcons }) {


    const IconsKu = ({ icon, Path = '' }) => {
        const IconComponent = HeroIcons[icon];
        return IconComponent ? <IconComponent className={`w-[20px] h-[20px] ${Path == window.location.pathname ? 'text-black' : "text-white"}`} /> : null;
    };

    return (
        <>
            <NavLink to={href} className={`hidden my-1 lg:flex ${href == window.location.pathname ? "bg-white text-black shadow-2xl" : "bg-[#00092b] text-white hover:text-blue-500 hover:bg-white hover:bg-opacity-20 flex"} h-8 transition-all duration-300 rounded-md`}>
                <div className="flex justify-center items-center h-8 w-8 p-1 text-black">
                    <IconsKu icon={icon} Path={href} />
                </div>
                {toggle ? (
                    <div className={"w-full flex text-center h-full items-center text-sm"}>{name}</div>
                ) : null}
            </NavLink>
            <NavLink onClick={() => setToggle(false)} to={href} className={`sm:flex items-center lg:hidden ${href == window.location.pathname ? "bg-white text-black h-10 flex shadow-2xl" : "bg-[#00092b] text-gray-300 h-10 flex hover:text-blue-700"} font-semibold transition-all duration-300 rounded-md`}>
                <div className="flex justify-center h-8 w-8 p-1 text-white font-semibold">
                    <IconsKu icon={icon} Path={href} />
                </div>
                <div className={"w-full flex  text-center h-full items-center text-sm"}>{name}</div>
            </NavLink>
        </>
    )
}

export default Menu
