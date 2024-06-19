import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-gray-100 rounded-md py-1 px-3 w-full">
            <div className="flex items-center gap-1">
                <input type={`${showPassword ? 'text' : 'password'}`} value={value} onChange={onChange} className='flex-1 bg-transparent outline-none' placeholder={placeholder} />
                {showPassword ? <FaEyeSlash onClick={() => setShowPassword(!showPassword)} /> :
                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                }
            </div>
        </div>
    )
}

export default PasswordInput