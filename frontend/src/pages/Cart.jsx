import { useDeleteProductFromCartMutation, useGetProductsFromCartQuery, useGetTotalFromCartQuery, useUpdateProductFromCartMutation } from "../redux/features/cart/cartApiSlice"

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { capitalize } from "../helpers/capitalize";

import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

import notFound from "../../public/assest/notFound.png"

const Cart = () => {
    const { data: cart, isLoading, isError, error: getErrorProducts } = useGetProductsFromCartQuery();
    const [deleteProductFromCart, { error: getErrorDelete }] = useDeleteProductFromCartMutation()
    const [updateProductFromCart, { error: getErrorUpdate }] = useUpdateProductFromCartMutation()
    const { data: subtotal } = useGetTotalFromCartQuery()

    const handleDeleteFromCart = (id) => {
        try {
            const { data } = deleteProductFromCart({ id })
            toast.success("Deleted Successfully")
        } catch (error) {
            toast.error(`${getErrorDelete.data.message}`)
            console.log(error)
        }
    }

    const increaseQuantity = (id, quantity) => {
        try {
            updateProductFromCart({ id, quantity });
            toast.success("Increased Successfully")
        } catch (error) {
            toast.error(`${getErrorUpdate.data.message}`)
            console.log(error)
        }
    }

    const decreaseQuantity = (id, quantity) => {
        try {
            console.log("quantity", quantity)
            if (quantity > 0) {
                updateProductFromCart({ id, quantity });
                toast.success("Decreased Successfully")
            } else {
                handleDeleteFromCart(id)
            }
        } catch (error) {
            toast.error(`${getErrorUpdate.data.message}`)
            console.log(error)
        }
    }

    return (
        <div>
            {isLoading &&
                <div className='flex justify-center items-center py-10 h-[calc(100vh-110px)]'>
                    <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                </div>
            }

            {(!isLoading && !isError) &&
                <div className="px-10 py-6 flex gap-10 bg-gray-50">
                    <div className="flex-1 grid gap-3 h-fit">
                        {cart && cart.map((item, i) => (
                            <div key={i} className="flex items-center shadow-md border rounded-md overflow-hidden">
                                <div className="w-[140px] h-[140px] bg-slate-200 p-2">
                                    <img src={item.product.images[0]} alt="" className="w-full h-full object-contain mix-blend-darken" />
                                </div>

                                <div className="py-2 px-5 flex-1">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-lg">{(item.product.title.length > 20) ? item.product.title.slice(0, 20) + "..." : item.product.title}</h3>
                                        <MdDelete size={20} onClick={() => handleDeleteFromCart(item.product._id)} className="text-red-600 hover:text-red-700 cursor-pointer" />
                                    </div>
                                    <p className="text-gray-400">{capitalize(item.product.category)}</p>
                                    <div className="flex justify-between items-center">
                                        <p className="text-red-600 text-xl my-1 font-semibold">${item.product.selling}</p>
                                        <p className="text-gray-600 text-xl my-1 font-semibold">${item.product.selling * item.quantity}</p>
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <FaMinus onClick={() => decreaseQuantity(item.product._id, item.quantity - 1)} className="border border-red-600 rounded-md p-1 text-gray-500 hover:text-gray-600 hover:bg-red-50 cursor-pointer transition duration-200" size={25} />
                                        <span>{item.quantity}</span>
                                        <FaPlus onClick={() => increaseQuantity(item.product._id, item.quantity + 1)} className="border border-red-600 rounded-md p-1 text-gray-500 hover:text-gray-600 hover:bg-red-50 cursor-pointer transition duration-200" size={25} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="min-w-[450px]">
                        <div className="flex flex-col rounded-md overflow-hidden">
                            <p className="bg-red-500 text-white py-1 px-3">Summary</p>

                            <div className="bg-white py-1 px-3">
                                <div className="flex items-center justify-between gap-3 py-1">
                                    <p>Subtotal</p>
                                    <p>${subtotal?.total}</p>
                                </div>

                                <div className={`flex items-center justify-between gap-3 py-1 ${subtotal?.total > 1000 && "text-green-600"}`}>
                                    <p>Shopping</p>
                                    <p>{subtotal?.total > 1000 ? "Free" : "$19"}</p>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-lg font-semibold py-1">
                                    <p>Total</p>
                                    <p>${subtotal?.total + 19}</p>
                                </div>
                            </div>

                            <button className="bg-blue-500 text-white py-2 px-3 font-semibold">Payment</button>
                        </div>
                    </div>
                </div>
            }

            {isError &&
                <div className="py-5 text-center">
                    <div className="flex justify-center">
                        <img src={notFound} alt="" className="h-[200px] mix-blend-multiply" />
                    </div>
                    <p className="text-gray-600 text-lg">{getErrorProducts.data.message}</p>
                    <Link to={"/"} className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md mt-3 block w-fit mx-auto">Back To Home</Link>
                </div>
            }
        </div>

    )
}

export default Cart