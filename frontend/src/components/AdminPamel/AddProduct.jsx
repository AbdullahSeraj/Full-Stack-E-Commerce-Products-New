import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import productCategory from '../../helpers/productCategories';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../../helpers/uploadImage';
import { MdDelete } from "react-icons/md";
import ShowImage from './ShowImage';
import { useUploadProductMutation } from '../../redux/features/product/productApiSlice';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [uploadProduct, { isLoading, isError, error: inputError }] = useUploadProductMutation()

    const navigate = useNavigate()
    const [product, setProduct] = useState({ title: "", description: "", brand: "", category: "", images: [], price: "", selling: "" })
    const [nowImage, setNowImage] = useState("")
    const [showImage, setShowImage] = useState(false)
    const handleShowImage = () => {
        setShowImage(!showImage)
    }

    const imageFile = async (e) => {
        const file = e.target.files[0]
        // const image = await imageToBase(file)
        // setProduct((prev) => { return { ...prev, images: [...product.images, image] } })

        if (file) {
            const uploadImageCloudinary = await uploadImage(file)
            setProduct((prev) => { return { ...prev, images: [...product.images, uploadImageCloudinary.url] } })
        }
    }

    const removeImage = (imgUrl) => {
        const images = product.images.filter((img) => img !== imgUrl)
        setProduct((prev) => { return { ...prev, images: images } })
    }

    const handleAddProduct = async (e) => {
        e.preventDefault()

        try {
            const { data } = await uploadProduct({
                ...product
            })

            if (data) {
                toast.success("Uploaded Successfully")
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
                    <p className='font-bold'>Upload Product</p>
                    <div><IoClose size={22} className="hover:text-red-600 cursor-pointer" onClick={() => navigate("/admin-panel/products")} /></div>
                </div>

                <form action="" onSubmit={handleAddProduct} className='overflow-y-auto' style={{ height: "calc(100% - 32px)" }}>
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

                    <button className='bg-red-500 rounded-md text-white hover:bg-red-600 font-semibold my-3 py-2 w-full'>{isLoading ? "Loading..." : "Upload Product"}</button>
                </form>
            </div>

            {showImage && <ShowImage img={nowImage} handleShowImage={handleShowImage} />}
        </div>
    )
}

export default AddProduct