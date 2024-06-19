import React, { useCallback, useState } from 'react'
import { useGetProductQuery } from '../redux/features/product/productApiSlice'
import { useParams } from 'react-router-dom'
import { capitalize } from '../helpers/capitalize'
import { GoStarFill } from "react-icons/go";
import { GoStar } from "react-icons/go";
import CategorySliceVertical from '../components/CategorySliceVertical';
import { useAddToCartMutation } from '../redux/features/cart/cartApiSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const { id } = useParams()
    const { data: product, isLoading } = useGetProductQuery(id)
    const [addToCart, { isError, error }] = useAddToCartMutation()

    const [mainImage, setMainImage] = useState(0)

    const [isShowImage, setIsShowImage] = useState(false)
    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })

    const handleZoomImage = useCallback((e) => {
        setIsShowImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({ x, y })
    }, [zoomImageCoordinate])

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
        <div className='px-10 py-6'>
            {isLoading ?
                <div className="animate-pulse flex items-center gap-6">
                    <div className='grid gap-3'>
                        <div className="bg-slate-200 w-[100px] h-[100px] mb-2"></div>
                        <div className="bg-slate-200 w-[100px] h-[100px] mb-2"></div>
                        <div className="bg-slate-200 w-[100px] h-[100px] mb-2"></div>
                        <div className="bg-slate-200 w-[100px] h-[100px] mb-2"></div>
                    </div>
                    <div className="bg-slate-200 w-[430px] h-[430px] mb-2"></div>
                    <div className="flex-1 h-full mb-2 py-5 px-3 flex flex-col justify-between gap-5">
                        <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                        <div className="h-8 w-full mx-auto bg-slate-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                        <div className="h-4 w-full mx-auto bg-slate-200 rounded"></div>
                        <div className="h-7 w-full mx-auto bg-slate-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
                        <div className="h-4 w-full mx-auto bg-slate-200 rounded"></div>
                        <div className="h-4 w-full mx-auto bg-slate-200 rounded"></div>
                    </div>
                </div>
                :
                <div className='flex flex-col lg:flex-row items-center gap-9'>
                    <div className='flex flex-col-reverse lg:flex-row gap-6 items-center'>
                        <div className='flex gap-3 lg:grid max-w-[300px] sm:w-fit'>
                            {product?.images.map((img, i) => (
                                <div key={i} className='bg-gray-200 w-[100px] h-[100px] rounded-md overflow-hidden p-2' onMouseMove={() => setMainImage(i)}>
                                    <img src={img} alt="" className='w-full h-full mix-blend-multiply object-contain cursor-pointer' />
                                </div>
                            ))}
                        </div>

                        <div className='relative bg-gray-200 w-[300px] h-[300px] sm:w-[430px] sm:h-[430px] rounded-md'>
                            <img src={product?.images[mainImage]} alt="" className='mix-blend-multiply object-contain w-full h-full p-4 cursor-zoom-in' onMouseMove={handleZoomImage} onMouseLeave={() => setIsShowImage(false)} />

                            {isShowImage && <div className='hidden lg:block absolute top-0 -right-full translate-x-4 bg-gray-200 w-[430px] h-[430px] rounded-md overflow-hidden'>
                                <div className='mix-blend-multiply object-contain w-full h-full p-4 scale-150'
                                    style={{ backgroundImage: `url(${product?.images[mainImage]})`, backgroundRepeat: "no-repeat", backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%` }}
                                ></div>
                            </div>}
                        </div>
                    </div>

                    <div>
                        <div className='bg-red-500/30 text-red-500 rounded-full px-2 w-fit mb-1'>Boat</div>
                        <h2 className='font-bold text-3xl'>{product?.title}</h2>
                        <p className='text-gray-400'>{capitalize(product?.category)}</p>
                        <div className='flex items-center gap-[3px] text-amber-400 my-1'>
                            <GoStarFill />
                            <GoStarFill />
                            <GoStarFill />
                            <GoStarFill />
                            <GoStar />
                            <span className='text-xs ml-2'>(4.4)</span>
                        </div>
                        <div className='flex gap-6 my-3'>
                            <span className='text-red-600 font-bold text-4xl'>${(Number(product?.selling)).toFixed(2)}</span>
                            <span className='text-gray-400 font-semibold line-through text-4xl'>${(Number(product?.price)).toFixed(2)}</span>
                        </div>
                        <div className='flex gap-4 mb-4'>
                            <button className='bg-white hover:bg-red-600/10 transition duration-200 border-2 border-red-600 text-red-600 font-semibold py-1 px-4 rounded-md min-w-32'>Buy</button>
                            <button onClick={() => handleAddToCart(product, 1)} className='bg-red-600 hover:bg-red-700 transition duration-200 border-2 border-red-600 text-white font-semibold py-1 px-4 rounded-md min-w-32'>Add To Cart</button>
                        </div>
                        <div className='text-gray-500'>
                            <p className='text-gray-800'>Description:</p>
                            <p>{product?.description}</p>
                        </div>
                        <p className='text-gray-800 font-semibold mt-3'>Best {capitalize(product?.category)}</p>
                    </div>
                </div>
            }

            <div className='mt-16 mb-5'>
                <CategorySliceVertical title={"Pecommended Product"} category={product?.category} />
            </div>
        </div>
    )
}

export default ProductDetails