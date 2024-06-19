import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import productCategory from '../../helpers/productCategories';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import ShowImage from './ShowImage';
import { useGetProductQuery, useUpdateProductMutation } from '../../redux/features/product/productApiSlice';
import { toast } from 'react-toastify';

const UpdateProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [updateProduct, { isLoading, isError, error: inputError }] = useUpdateProductMutation()
    const { data, isLoading: isLoadingGetPro } = useGetProductQuery(id)

    const [product, setProduct] = useState({ title: data?.title || "", description: data?.description || "", brand: data?.brand || "", category: data?.category || "", images: data?.images || [], price: data?.price || "", selling: data?.selling || "" })

    useEffect(() => {
        setProduct({ ...product, title: data?.title || "", description: data?.description || "", brand: data?.brand || "", category: data?.category || "", images: data?.images || [], price: data?.price || "", selling: data?.selling || "" })
    }, [data])

    const [nowImage, setNowImage] = useState("")
    const [showImage, setShowImage] = useState(false)
    const handleShowImage = () => {
        setShowImage(!showImage)
    }

    const imageFile = async (e) => {
        const file = e.target.files[0]
        // const image = await imageToBase(file)
        // setProduct((prev) => { return { ...prev, images: [...product.images, image] } })

        const uploadImageCloudinary = await uploadImage(file)
        setProduct((prev) => { return { ...prev, images: [...product.images, uploadImageCloudinary.url] } })
    }

    const removeImage = (imgUrl) => {
        const images = product.images.filter((img) => img !== imgUrl)
        setProduct((prev) => { return { ...prev, images: images } })
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()

        try {
            const { data } = await updateProduct({
                ...product,
                id: id
            })

            console.log(data)

            if (data) {
                toast.success("Updated Successfully")
                navigate("/admin-panel/products")
            }
        } catch (error) {
            toast.error(`${inputError?.data.message}`)
            console.log(error)
        }
    }

    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <div className="fixed top-0 left-0 w-full h-full bg-gray-900/30 z-40" onClick={() => navigate("/admin-panel/products")}></div>
            <div className='bg-white rounded-md p-6 w-[700px] h-[75%] z-50'>
                <div className='flex items-center justify-between border-b border-gray-200 pb-2 bg-white'>
                    <p className='font-bold'>Update Product</p>
                    <div><IoClose size={22} className="hover:text-red-600 cursor-pointer" onClick={() => navigate("/admin-panel/products")} /></div>
                </div>

                {!isLoadingGetPro ? <form action="" onSubmit={handleAddProduct} className='overflow-y-auto' style={{ height: "calc(100% - 32px)" }}>
                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="title" className='text-gray-500'>Title:</label>
                        <input type="text" id='title' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' placeholder='enter title product' value={product.title} onChange={(e) => setProduct((prev) => { return { ...prev, title: e.target.value } })} />
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="description" className='text-gray-500'>Description:</label>
                        <textarea rows="5" type="text" id='description' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' placeholder='enter description product' value={product.description} onChange={(e) => setProduct((prev) => { return { ...prev, description: e.target.value } })} />
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="brand" className='text-gray-500'>Brand:</label>
                        <input type="text" id='brand' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' placeholder='enter brand product' value={product.brand} onChange={(e) => setProduct((prev) => { return { ...prev, brand: e.target.value } })} />
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="image" className='text-gray-500'>Upload Image:</label>
                        <label htmlFor="uploadImages" className='border-2 h-[150px] border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50 flex flex-col justify-center items-center'>
                            <IoMdCloudUpload size={40} className='text-gray-500' />
                            <p className='text-gray-500 text-sm'>Upload Product Image</p>
                            <input type="file" name="" id="uploadImages" className='hidden' onChange={imageFile} />
                        </label>
                        <div className='flex gap-3 mt-2'>
                            {product.images.map((img, i) => (
                                <div key={i} className='relative group w-[70px] h-[70px] bg-gray-50 border border-gray-200 rounded-md overflow-hidden'>
                                    <img src={img} alt="" className='h-full cursor-pointer' onClick={() => { handleShowImage(); setNowImage(img) }} />
                                    <MdDelete size={19} className='absolute bottom-0 right-0 group-hover:flex hidden bg-red-600 p-[3px] rounded-full text-white cursor-pointer' onClick={() => removeImage(img)} />
                                </div>
                            ))}
                        </div>
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="category" className='text-gray-500'>category:</label>
                        <select type="text" name='category' id='category' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' value={product.category} onChange={(e) => setProduct((prev) => { return { ...prev, category: e.target.value } })}>
                            <option value="">Select Category</option>
                            {productCategory.map((cat) => (
                                <option key={cat.id} value={cat.value}>{cat.label}</option>
                            ))}
                        </select>
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="price" className='text-gray-500'>price:</label>
                        <input type="text" id='price' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' placeholder='enter price product' value={product.price} onChange={(e) => setProduct((prev) => { return { ...prev, price: e.target.value } })} />
                    </fieldset>

                    <fieldset className='flex flex-col py-2'>
                        <label htmlFor="selling" className='text-gray-500'>selling:</label>
                        <input type="text" id='selling' className='border-2 border-gray-300 py-1 px-3 rounded-md outline-none bg-gray-50' placeholder='enter selling product' value={product.selling} onChange={(e) => setProduct((prev) => { return { ...prev, selling: e.target.value } })} />
                    </fieldset>

                    {isError &&
                        <div className='text-sm text-center text-red-600'>{inputError.data.message}</div>
                    }

                    <button className='bg-red-500 rounded-md text-white hover:bg-red-600 font-semibold my-3 py-2 w-full'>{isLoading ? "Loading..." : "Update Product"}</button>
                </form>
                    : <div className='flex justify-center items-center py-5'>
                        <svg className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                }
            </div>

            {showImage && <ShowImage img={nowImage} handleShowImage={handleShowImage} />}
        </div>
    )
}

export default UpdateProduct