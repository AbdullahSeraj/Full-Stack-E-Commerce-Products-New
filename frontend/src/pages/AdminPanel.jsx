import { NavLink, Outlet } from 'react-router-dom'
import { useGetUserQuery } from '../redux/features/user/userApiSlice';

import { IoPersonCircleOutline } from "react-icons/io5";

const AdminPanel = () => {
    const { data: getUser } = useGetUserQuery()

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='admin-profile bg-white w-full md:w-[350px] text-center p-6'>
                <div className='flex md:block justify-center items-center gap-3'>
                    <div className='flex items-center justify-center my-3'>
                        {getUser?.picture ?
                            <img src={getUser?.picture} alt="" className='rounded-full w-[70px] h-[70px]' />
                            : <IoPersonCircleOutline size={100} className='text-gray-700' />
                        }
                    </div>
                    <div>
                        <h3 className='font-semibold text-lg'>{getUser?.name}</h3>
                        <p className='text-sm text-gray-400'>{getUser?.role ? "Admin" : "User"}</p>
                    </div>
                </div>

                <div className='mt-2 md:mt-10'>
                    <div className='text-start mb-3'><NavLink className={"underline"} to="/admin-panel">All Users</NavLink></div>
                    <div className='text-start'><NavLink className={"underline"} to='/admin-panel/products'>All Products</NavLink></div>
                </div>
            </div>

            <div className='w-full overflow-auto h-[calc(100vh-110px)]'>
                <Outlet />
            </div>
        </div>
    )
}

export default AdminPanel