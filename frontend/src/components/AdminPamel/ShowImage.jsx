import { IoClose } from "react-icons/io5";

const ShowImage = ({ img, handleShowImage }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
            <div className='absolute top-0 left-0 w-full h-full bg-gray-500/40' onClick={handleShowImage}></div>
            <div className='relative bg-white rounded-md p-10 w-fit z-50'>
                <img src={img} alt="" className='max-w-[500px] max-h-[500px]' />
                <IoClose size={21} className='absolute top-3 right-3 hover:text-red-500 cursor-pointer' onClick={handleShowImage} />
            </div>
        </div>
    )
}

export default ShowImage