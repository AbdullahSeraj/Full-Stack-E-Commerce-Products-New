import React, { useEffect, useRef, useState } from 'react'
import { useGetProductsCategoryQuery } from '../redux/features/product/productApiSlice'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useAddToCartMutation } from '../redux/features/cart/cartApiSlice'
import { toast } from 'react-toastify';

const CategorySliceVertical = ({ title, category }) => {
    const { data: products, isLoading } = useGetProductsCategoryQuery(category)
    const [addToCart, { isError, error }] = useAddToCartMutation()

    const [scroll, setScroll] = useState(0)
    const scrollElment = useRef(scroll)

    const scrollRight = () => {
        // scrollElment.current.scrollLeft += 400
        if (scroll < scrollElment.current.scrollWidth - scrollElment.current.clientWidth) { // 3400
            setScroll(scroll + 400)
        } else {
            setScroll(0)
        }
    }

    const scrollLeft = () => {
        // scrollElment.current.scrollLeft -= 400
        if (scroll > 0) { // 3400
            setScroll(scroll - 400)
        } else {
            setScroll(scrollElment.current.scrollWidth - scrollElment.current.clientWidth)
        }
    }

    useEffect(() => {
        scrollElment.current.scrollTo({ left: scroll, behavior: 'smooth' });
    }, [scroll])

    const handleAddToCart = (product, quantity) => {
        try {
            const { data } = addToCart({
                product,
                quantity,
            })

            toast.success("Added to cart successfully")
        } catch (error) {
            toast.error("Error Server")
            console.log("Error", error)
        }
    }

    return (
        <div className='my-5'>
            <h2 className='text-2xl font-semibold'>{title}</h2>

            <div className='relative'>
                <div className='flex gap-5 overflow-auto scrollbar-none py-3 transition-all duration-700' ref={scrollElment}>
                    {products && products?.slice(0, 10).map((product, i) => (
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

                <div className="absolute top-1/2 -right-2 -translate-y-1/2 hidden md:block">
                    <button className="bg-gray-200 rounded-full shadow-md p-2 cursor-pointer" onClick={scrollRight}>
                        <IoIosArrowForward size={16} />
                    </button>
                </div>

                <div className="absolute top-1/2 -left-2 -translate-y-1/2 hidden md:block">
                    <button className="bg-gray-200 rounded-full shadow-md p-2 cursor-pointer" onClick={scrollLeft}>
                        <IoIosArrowBack size={16} />
                    </button>
                </div>
            </div>

            {isLoading && <div className='flex items-center gap-5 overflow-hidden'>
                {[...Array(10)].map((array, i) => (
                    <div className="animate-pulse flex flex-col" key={i}>
                        <div className="bg-slate-200 w-[230px] h-[150px]"></div>
                        <div className="bg-white w-[230px] h-[150px] mb-2 py-5 px-3 flex flex-col justify-between gap-2">
                            <div className="h-3 w-full mx-auto bg-slate-200 rounded"></div>
                            <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                            <div className="h-3 w-full mx-auto bg-slate-200 rounded"></div>
                            <div className="h-6 w-full mx-auto bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default CategorySliceVertical