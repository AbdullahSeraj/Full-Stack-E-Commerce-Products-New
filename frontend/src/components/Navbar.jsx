import React, { useState } from 'react'

import { MdSearch } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

import Logo from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Cookies from "js-cookie";
import { useLogoutMutation } from '../redux/features/auth/authApiSlice';
import { useGetUserQuery } from '../redux/features/user/userApiSlice';
import { toast } from 'react-toastify';
import { useGetLengthFromCartQuery } from '../redux/features/cart/cartApiSlice';

const Navbar = () => {
    const searchInput = useLocation()
    const [search, setSearch] = useState(searchInput?.search.split("=")[1] || "")
    const { data } = useGetLengthFromCartQuery()

    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)

    const accessToken = Cookies.get("accessToken")
    const [logout] = useLogoutMutation()

    const { data: getUser } = useGetUserQuery()

    const onLogout = async () => {
        logout()
        Cookies.remove("accessToken")
        toast.success("Logout Successfully")
    }

    const handleSearch = (e) => {
        const { value } = e.target
        setSearch(value);
        if (value) {
            navigate(`/search?q=${value}`)
        } else {
            navigate(`/search`)
        }
    }

    return (
        <div className='fixed top-0 left-0 right-0 flex justify-between items-center gap-3 h-[60px] shadow-lg px-7 bg-white z-50'>
            <Link to={"/"} className='cursor-pointer'><Logo /></Link>

            <div className='items-center rounded-full border border-gray-300 bg-gray-100 hidden md:flex'>
                <input type="text" value={search} onChange={handleSearch} className='flex-1 bg-transparent py-1 px-5 outline-none w-[300px]' placeholder='Search product here...' />
                <MdSearch size={25} className='bg-red-500 rounded-r-full h-[32px] w-[40px] text-white px-2 cursor-pointer border border-red-500 hover:bg-red-600 transition duration-200' />
            </div>

            <div className='flex items-center gap-4'>
                {accessToken && <div className="relative">
                    {getUser?.picture ?
                        <img src={getUser?.picture} alt="" className='rounded-full w-[40px] h-[40px] cursor-pointer' onClick={() => setShowMenu(!showMenu)} />
                        : <IoPersonCircleOutline size={40} className='text-gray-700 cursor-pointer' onClick={() => setShowMenu(!showMenu)} />
                    }

                    {showMenu && <div className="absolute -bottom-[90%] translate-y-1/2 left-1/2 -translate-x-1/2 bg-white rounded-md p-2 w-[110px]">
                        <Link to={"/profile"} onClick={() => setShowMenu(false)} className='block my-[3px] hover:bg-gray-50 rounded-md cursor-pointer py-1 px-3 text-xs text-center'>Profile</Link>
                        {getUser?.role &&
                            <Link to={"/admin-panel"} onClick={() => setShowMenu(false)} className='block my-[3px] hover:bg-gray-50 rounded-md cursor-pointer py-1 px-3 text-xs text-center'>Admin Panel</Link>
                        }
                    </div>}
                </div>}

                <div className='relative cursor-pointer' onClick={() => { accessToken ? navigate("/cart") : navigate("/login") }}>
                    <FaShoppingCart size={22} className='text-gray-700' />
                    {data?.cartLength !== 0 &&
                        <div className='absolute -top-2 -right-2 w-4 h-4 text-[11px] text-white rounded-full bg-red-500 flex items-center justify-center'>{data?.cartLength}</div>
                    }
                </div>


                {accessToken ?
                    <button className='btn-full text-sm' onClick={onLogout}>logout</button>
                    : <button className='btn-full text-sm' onClick={() => navigate("/login")}>Login</button>
                }
            </div>
        </div>
    )
}

export default Navbar