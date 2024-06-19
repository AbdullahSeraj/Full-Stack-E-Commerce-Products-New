import React from 'react'

const Footer = () => {
    return (
        <div className='bg-white text-center h-[50px] flex items-center justify-center text-sm'>
            <p className='font-semibold text-gray-500'>Copyright &copy;{new Date().getFullYear()} | Designed by
                <a href="https://serajs-net.com" className='hover:text-gray-700' target='_blank'> SERAJS-NET</a>
            </p>
        </div>
    )
}

export default Footer