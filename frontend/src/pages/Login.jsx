import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/PasswordInput'
import { useState } from 'react'
import { useLoginMutation } from '../redux/features/auth/authApiSlice'
import Cookies from "js-cookie"; // npm i js-cookie
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ email: "", password: "" })
    const [login, { isError, isLoading, error: inputError }] = useLoginMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const { data } = await login({
                email: inputs.email,
                password: inputs.password
            })

            const accessToken = data.accessToken;
            if (accessToken) {
                Cookies.set("accessToken", accessToken)
                setInputs({ email: "", password: "" })
                navigate('/')
                toast.success("Login Successfully")
            }
        } catch (error) {
            toast.error(`${inputError.data.message}`)
            console.log("Error", error)
        }

    }
    return (
        <>
            <div className='flex justify-center items-center h-[600px]'>
                <div className='bg-white rounded-md w-[400px] p-7 shadow-md'>
                    <img src="assest/signin.gif" alt="" className='w-[100px] mx-auto rounded-full' />

                    <form onSubmit={handleSubmit} className='mt-5'>
                        <fieldset className='mb-3'>
                            <label htmlFor="">Email:</label>
                            <input type="email" value={inputs.email} onChange={(e) => setInputs((prev) => { return { ...prev, email: e.target.value } })} className='bg-gray-100 rounded-md outline-none py-1 px-3 w-full' placeholder='enter email' />
                        </fieldset>

                        <fieldset>
                            <label htmlFor="">Password:</label>
                            <PasswordInput placeholder={"enter password"} value={inputs.password} onChange={(e) => setInputs((prev) => { return { ...prev, password: e.target.value } })} />
                        </fieldset>
                        <p className='text-right text-sm text-gray-400 cursor-pointer'>Forgot password?</p>

                        <div className='mt-6'>
                            {isError && <div className='text-center text-red-500 text-sm'>{inputError.data.message}</div>}
                            <button className='btn-full w-full mt-1'>Login</button>
                        </div>

                        <p className='text-sm text-center text-gray-400 mt-5'>Don't have account? <Link to={"/signup"} className='text-red-500'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login