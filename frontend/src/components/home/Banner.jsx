import img1 from "../../../public/assest/banner/img1.webp";
import img2 from "../../../public/assest/banner/img2.webp";
import img3 from "../../../public/assest/banner/img3.jpg";
import img4 from "../../../public/assest/banner/img4.jpg";
import img5 from "../../../public/assest/banner/img5.webp";

import img1_mobile from "../../../public/assest/banner/img1_mobile.jpg";
import img2_mobile from "../../../public/assest/banner/img2_mobile.webp";
import img3_mobile from "../../../public/assest/banner/img3_mobile.jpg";
import img4_mobile from "../../../public/assest/banner/img4_mobile.jpg";
import img5_mobile from "../../../public/assest/banner/img5_mobile.png";

import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

import { useEffect, useState } from "react";

const images = [img3, img4, img1, img2, img5]
const images_mobile = [img1_mobile, img2_mobile, img3_mobile, img4_mobile, img5_mobile]

const Banner = () => {
    const [number, setNumber] = useState(0)

    const next = () => {
        (number < 400 ? setNumber(number + 100) : setNumber(0))
    }

    const prev = () => {
        (number > 0 ? setNumber(number - 100) : setNumber(400))
    }

    useEffect(() => {
        const interval = setInterval(() => {
            next()
        }, 3000)

        return () => clearInterval(interval)
    }, [number])

    return (
        <div className="relative">
            <div className="md:flex hidden h-[340px] overflow-hidden">
                {images.map((image, i) => (
                    <div className="w-full h-full min-w-full min-h-full px- transition duration-300 rounded-md overflow-hidden" key={i} style={{ transform: `translateX(-${number}%)` }}>
                        <img src={image} alt="" className="w-full h-full object-cover hover:" />
                    </div>
                ))}
            </div>

            <div className="flex md:hidden h-[390px] overflow-hidden">
                {images_mobile.map((image, i) => (
                    <div className="w-full h-full min-w-full min-h-full px- transition duration-300 rounded-md overflow-hidden" key={i} style={{ transform: `translateX(-${number}%)` }}>
                        <img src={image} alt="" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>

            <div className="absolute top-1/2 right-2 -translate-y-1/2 hidden md:block">
                <button className="bg-gray-200 rounded-full shadow-md p-2 cursor-pointer" onClick={next}>
                    <IoIosArrowForward size={20} />
                </button>
            </div>

            <div className="absolute top-1/2 left-2 -translate-y-1/2 hidden md:block">
                <button className="bg-gray-200 rounded-full shadow-md p-2 cursor-pointer" onClick={prev}>
                    <IoIosArrowBack size={20} />
                </button>
            </div>
        </div>
    )
}

export default Banner