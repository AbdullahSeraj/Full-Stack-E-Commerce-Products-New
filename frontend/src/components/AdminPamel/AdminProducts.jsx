import { Link, Outlet, useNavigate } from "react-router-dom"
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../redux/features/product/productApiSlice"
import { toast } from 'react-toastify';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AdminProducts = () => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useGetAllProductsQuery()

  const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductMutation()

  const handleDelete = (id) => {
    try {
      deleteProduct(id)
      toast.success("Deleted Successfully")
    } catch (error) {
      toast.error("Product not found")
      console.log(error)
    }
  }

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between px-5 bg-white py-3 shadow-md">
        <p className="font-bold">All Product</p>
        <Link to={"/admin-panel/products/add"} className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition duration-200 rounded-full px-3 py-1">Upload Product</Link>
      </div>

      {isLoading && <div className='flex justify-center items-center py-5'>
        <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
      </div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 mt-4">
        {data?.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex justify-center">
              <img src={product.images[0]} alt="" className="w-[200px] h-[200px] object-contain mix-blend-multiply" />
            </div>
            <div className="p-1">
              <p>{product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}</p>
              <p className="font-semibold">${product.selling}</p>
              <MdDelete size={26} onClick={() => handleDelete(product._id)} className="float-end bg-red-400/20 hover:bg-red-400/40 rounded-full p-1 cursor-pointer ml-2" />
              <MdModeEdit size={26} onClick={() => navigate(`/admin-panel/products/update/${product._id}`)} className="float-end bg-green-400/20 hover:bg-green-400/40 rounded-full p-1 cursor-pointer" />
            </div>
          </div>
        ))}
      </div>

      {isError && <div className="text-red-500 text-center">{error.data.message}</div>}

      {isLoadingDelete &&
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900/30 z-40 flex items-center justify-center">
          <div className='flex justify-center items-center py-5'>
            <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        </div>
      }

      <Outlet />
    </div>
  )
}

export default AdminProducts