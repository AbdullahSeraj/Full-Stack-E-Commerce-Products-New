import { Link } from "react-router-dom"
import { useAddToCartMutation } from "../redux/features/cart/cartApiSlice"
import { toast } from 'react-toastify';

const ProductsVertical = ({ data, className }) => {
    const [addToCart, { isError, error: getError }] = useAddToCartMutation()

    const handleAddToCart = (product, quantity) => {
        try {
            const { data } = addToCart({
                product,
                quantity,
            })

            if (isError) {
                toast.error(`${getError.data.message}`)
            } else {
                toast.success("Added to cart successfully")
            }
        } catch (error) {
            toast.error("Error Server")
            console.log("Error", error)
        }
    }

    return (
        <div className={`${className ? className : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5"} grid py-3 transition-all duration-700`}>
            {data && data.map((product, i) => (
                <div key={i} className='rounded-md flex items-center flex-col w-full h-full shadow-md'>
                    <Link to={`/product/${product._id}`} className='bg-gray-200 w-full h-[150px] rounded-t-md p-3 group cursor-pointer'>
                        <img src={product.images[0]} alt="" className='w-full h-full object-contain mix-blend-darken group-hover:scale-105 transition duration-300' />
                    </Link>
                    <div className='py-3 px-4 min-w-[230px]'>
                        <h3 className='font-semibold'>{(product.title.length > 15 ? product.title.slice(0, 15) + "..." : product.title)}</h3>
                        <p className='text-gray-500'>{product.category}</p>
                        <div className='flex justify-between gap-2 my-2'>
                            <span className='text-red-600'>${(product.selling).toFixed(2)}</span>
                            <span className='text-gray-500 line-through'>${(product.price).toFixed(2)}</span>
                        </div>
                        <button onClick={() => handleAddToCart(product, 1)} className='rounded-full w-full bg-red-600 hover:bg-red-700 transition duration-200 text-white px-3 text-sm py-1'>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductsVertical