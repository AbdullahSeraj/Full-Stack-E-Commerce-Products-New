import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { useState } from 'react'
import imageToBase from '../helpers/ImageToBase'
import { useRegisterMutation } from '../redux/features/auth/authApiSlice'
import Cookies from "js-cookie"; // npm i js-cookie
import { toast } from 'react-toastify';

const SignUp = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ name: "", email: "", password: "", passwordConfirm: "", picture: "" })
    const [register, { isError, isSuccess, isLoading, error: inputError }] = useRegisterMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await register({
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                passwordConfirm: inputs.passwordConfirm,
                picture: inputs.picture
            })

            const accessToken = data.accessToken;
            if (accessToken) {
                Cookies.set("accessToken", accessToken)
                setInputs({
                    name: '',
                    email: "",
                    password: "",
                    passwordConfirm: '',
                    picture: ""
                })
                navigate("/")
                toast.success("Sign Up Successfully")
            }
        } catch (error) {
            toast.error(`${inputError.data.message}`)
            console.log("Error: ", error)
        }
    }

    const imageFile = async (e) => {
        const file = e.target.files[0]
        const image = await imageToBase(file)
        setInputs((prev) => { return { ...prev, picture: image } })
    }

    return (
        <>
            <div className='flex justify-center items-center h-[600px]'>
                <div className='bg-white rounded-md w-[400px] p-7 shadow-md'>
                    <div className='w-[100px] mx-auto'>
                        <div className='relative w-fit rounded-full overflow-hidden'>
                            <img src={inputs.picture || "assest/signin.gif"} alt="" className='w-[100px] h-[100px]' />
                            <form action="">
                                <label>
                                    <input type='file' className='z-40 hidden' onChange={imageFile} />
                                    <p className='absolute bottom-0 left-0 bg-gray-200/60 w-full text-center pt-1 pb-4 px-2 text-[12px] font-semibold cursor-pointer'>Upload Photo</p>
                                </label>
                            </form>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='mt-5'>
                        <fieldset className='mb-3'>
                            <label htmlFor="">Name:</label>
                            <input type="text" value={inputs.name} onChange={(e) => setInputs((prev) => { return { ...prev, name: e.target.value } })} className='bg-gray-100 rounded-md outline-none py-1 px-3 w-full' placeholder='enter your name' />
                        </fieldset>

                        <fieldset className='mb-3'>
                            <label htmlFor="">Email:</label>
                            <input type="email" value={inputs.email} onChange={(e) => setInputs((prev) => { return { ...prev, email: e.target.value } })} className='bg-gray-100 rounded-md outline-none py-1 px-3 w-full' placeholder='enter email' />
                        </fieldset>

                        <fieldset className='mb-3'>
                            <label htmlFor="">Password:</label>
                            <PasswordInput placeholder="enter Password" value={inputs.password} onChange={(e) => setInputs((prev) => { return { ...prev, password: e.target.value } })} />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="">Password:</label>
                            <PasswordInput placeholder="enter confirm Password" value={inputs.passwordConfirm} onChange={(e) => setInputs((prev) => { return { ...prev, passwordConfirm: e.target.value } })} />
                        </fieldset>
                        <p className='text-right text-sm text-gray-400 cursor-pointer'>Forgot password?</p>

                        <div className='mt-6'>
                            {isError && <div className='text-center text-red-500 text-sm'>{inputError.data.message}</div>}

                            <button className='btn-full w-full mt-1'>Sign Up</button>
                        </div>

                        <p className='text-sm text-center text-gray-400 mt-5'>Have account? <Link to={"/login"} className='text-red-500'>Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp