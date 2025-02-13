import React, { useState, Suspense, useContext } from 'react'
import { ListBulletIcon } from '@heroicons/react/24/solid'
import * as HeroIcons from '@heroicons/react/24/solid'

import Menu from '../Components/Menu';
import { Toaster } from 'react-hot-toast';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios'
import DropdownMenu from '../Components/Button/DropdownMenu'
import { AuthContext } from '../Contexts/AuthContex';
// import '../pages/ScrollbarNone.css'

function ResPonsiveMenu({ toggle, setToggle }) {
    return (<div className={`bg-[#00092b] absolute w-full z-20 flex flex-col overflow-auto transition-all duration-300`}>
        <div className="h-full overflow-y-auto p-2 py-1 scrollbar-none flex flex-col lg:hidden  max-h-fit bg-[#00092b]">
            <DropdownProduct toggle={toggle} setToggle={setToggle} />
        </div>
    </div>
    )
}

function DropdownProduct({ toggle, setToggle }) {
    return (
        <>
            {/* <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/dashboard' name="Dashboard" icon={'ChartBarIcon'} /> */}
            <DropdownMenu
                HeroIcons={HeroIcons}
                name="Master"
                icon='CircleStackIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    {/* <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/master/user' name="User" icon={'UserIcon'} /> */}
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/master/tags' name="Tags" icon={'TagIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/master/posts' name="Posts" icon={'PhotoIcon'} />
                    {/* <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/master/supplier' name="Supplier" icon={'UserIcon'} /> */}
                </div>}
            />

            {/* <DropdownMenu
                HeroIcons={HeroIcons}
                name="Management Barang"
                icon='WalletIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/management/barang/product' name="Product" icon={'CubeIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/management/barang/harga-pokok' name="Harga Pokok Product" icon={'CubeIcon'} />
                </div>}
            />

            <DropdownMenu
                HeroIcons={HeroIcons}
                name="Penjualan"
                icon='ShoppingBagIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/penjualan/invoice' name="Invoice Penjualan" icon={'DocumentCurrencyDollarIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/penjualan/kwitansi' name="Kwitansi Penjualan" icon={'DocumentTextIcon'} />
                </div>}
            />
            <DropdownMenu
                HeroIcons={HeroIcons}
                name="Pembelian"
                icon='ShoppingCartIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/pembelian/invoice' name="Invoice Pembelian" icon={'DocumentCurrencyDollarIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/pembelian/kwitansi' name="Kwitansi Pembelian" icon={'DocumentTextIcon'} />
                </div>}
            />

            <DropdownMenu
                HeroIcons={HeroIcons}
                name="Akutansi"
                icon='BuildingLibraryIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/akutansi/akun' name="Akun" icon={'CreditCardIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/akutansi/jurnal' name="Jurnal" icon={'NewspaperIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/akutansi/saldo-awal' name="Saldo Awal" icon={'CreditCardIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/akutansi/beban' name="Beban" icon={'ScaleIcon'} />
                </div>}
            />

            <DropdownMenu
                HeroIcons={HeroIcons}
                name="Laporan"
                icon='ClipboardDocumentListIcon'
                toggle={toggle}
                menu={<div className={toggle ? `p-1` : null}>
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/laporan/saldo-akun' name="Saldo Akun" icon={'BanknotesIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/laporan/bukubesar' name="Buku Besar" icon={'BookOpenIcon'} />
                    <Menu HeroIcons={HeroIcons} toggle={toggle} href='/system/laporan/laba-rugi' name="Laba Rugi" icon={'PresentationChartLineIcon'} />
                </div>}
            /> */}
        </>
    )
}

function Dashboard({ className }) {
    // * settup
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(true)

    // const {logout} = useContext(AuthContext);


    // * Api Call
    const HandleLogout = () => {
        axios.post('/api/v1/auth/logout').then(res => {
            localStorage.removeItem('authToken');
            setTimeout(() => {
                window.location.reload();
            }, 400);
            localStorage.removeItem('authToken');
        }).catch(err => {
            setTimeout(() => {
                localStorage.removeItem('authToken');
                window.location.reload();
            }, 400);
        })
    }

    // * functions
    function DateKu() {
        var d = (new Date() + "").split(" ");
        return [d[2], d[1], d[3]].join(" ");
    }


    return (
        <div className='flex flex-col'>
            <Toaster />
            {/* Navabr Start */}
            <div className="bg-[#00092b] w-full flex h-[50px] justify-between text-white border-b-2 border-gray-200 px-1">
                <div className="w-full flex items-center justify-start">
                    <div className="h-full lg:w-[209px] flex items-center justify-center ml-5 lg:ml-0">
                        <div className='text-lg font-semibold text-yellow-400'>
                            <span className='text-white'>
                                ELECT
                            </span>
                            ANSI
                        </div>
                    </div>
                </div>
                {/* <div className="flex justify-center items-center text-lg font-semibold ml-4">{header}</div> */}
                <div className="hidden justify-end items-center mr-2 w-full gap-x-2 font-semibold  xl:flex">
                    <NavLink to='/' className=' text-sm sm:text-sm md:text-md py-2 px-4 transition-color duration-300 rounded-lg hover:bg-gray-100 hover:bg-opacity-10'>Home</NavLink>
                    <button onClick={() => HandleLogout()} className='text-sm sm:text-sm md:text-md py-2 px-4 transition-color duration-300 rounded-lg hover:bg-gray-100 hover:bg-opacity-10'>Logout</button>
                </div>
                <div className="h-full w-full flex justify-end items-center lg:hidden">
                    <ListBulletIcon className='scale-125 text-white cursor-pointer mr-2 w-[35px] h-[25px]' onClick={() => setToggle(e => !e)} />
                </div>
            </div>
            {/* Navabr end */}
            <div className="flex w-full bg-white h-[calc(100vh-50px)] flex-col lg:flex-row" >
                <div className={`bg-[#00092b] ${toggle ? 'w-60' : 'w-16'} hidden flex-col overflow-auto transition-all duration-300 lg:flex`} >

                    <div className={`flex p-4  ${toggle ? 'justify-end' : 'justify-center'} transition-all duration-300`}>
                        <ListBulletIcon className='text-white cursor-pointer w-[35px] h-[25px]' onClick={() => { setToggle(e => !e) }} />
                    </div>

                    <div className="h-full overflow-y-auto p-2 py-1 scrollbar-none max-h-fit bg-[#00092b]">
                        {/*  Drop Down Product Start */}
                        <DropdownProduct toggle={toggle} />
                        {/*  Drop Down Product End */}
                    </div>

                </div>
                {/* Responsive Menu Start*/}
                {toggle ? (<ResPonsiveMenu toggle={toggle} setToggle={setToggle} />) : null}
                {/* Responsive Menu ENd*/}
                <div className="w-full overflow-y-auto scrollbar-none">
                    {/* Componenet start */}
                    <div className={`bg-gray-300 h-[calc(100vh-50px)] ${className} px-2 py-5 lg:py-4 lg:px-4 transition-all duration-500 overflow-y-auto`}>
                        <Suspense fallback={<Loading />}>
                            <Outlet />
                        </Suspense>
                    </div>
                    {/* Componenet end */}
                </div>
            </div>
        </div>
    )
}

function Loading() {
    return (<>
        <div className="flex p-40 bg-white rounded-lg shadow-lg justify-center">
            <span className='text-lg text-center'>Loading...</span>
        </div>
    </>)
}

export default Dashboard
