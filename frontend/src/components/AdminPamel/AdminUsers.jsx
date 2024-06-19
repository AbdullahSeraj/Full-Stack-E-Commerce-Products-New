import { MdEdit } from "react-icons/md";
import { useGetUsersQuery } from "../../redux/features/user/userApiSlice";
import HistoryDate from '../../helpers/HistoryDate';
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const AdminUsers = () => {
    const { data, isError, isLoading } = useGetUsersQuery()
    const [showUpdate, setShowUpdate] = useState(false)
    const handleShowUpdate = () => {
        setShowUpdate(!showUpdate)
    }

    return (
        <div className='p-2 w-full'>
            <div className='bg-white p-3 mx-auto w-[350px] sm:w-[500px] md:w-[500px] lg:w-full overflow-x-auto'>
                {!isLoading && !isError &&
                    <table className='text-center w-[700px] lg:w-full'>
                        <thead>
                            <tr>
                                <th className='bg-slate-700 text-white py-1 px-4 flex-1'>Sr.</th>
                                <th className='bg-slate-700 text-white py-1 px-4'>Name</th>
                                <th className='bg-slate-700 text-white py-1 px-4'>Email</th>
                                <th className='bg-slate-700 text-white py-1 px-4'>Role</th>
                                <th className='bg-slate-700 text-white py-1 px-4'>Created Date</th>
                                <th className='bg-slate-700 text-white py-1 px-4'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((user, i) => (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.role ? "Admin" : "User"}</td>
                                    <td><HistoryDate date={user?.createdAt} /></td>
                                    <td className='py-1'>
                                        <div className='flex justify-center'>
                                            <div className='rounded-full p-1 bg-green-200/40 cursor-pointer w-fit'><Link to={`/admin-panel/${user?._id}`}><MdEdit size={16} onClick={handleShowUpdate} /></Link></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

                {isLoading &&
                    <div className='flex justify-center items-center py-5'>
                        <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>

            <Outlet />
        </div>
    )
}

export default AdminUsers