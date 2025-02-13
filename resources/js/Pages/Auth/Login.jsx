import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



function Login() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [Errors, setErrors] = useState(null);
    const [Data, setData] = useState({
        'username': "",
        'password': ""
    });

    const HandleChange = (e) => {
        var value = e.target.value;
        var key = e.target.name;
        setData(e => ({
            ...e,
            [key]: value
        }))
    }

    const Login = async (e) => {

        if (loading) {
            const loadingToast = toast.loading('Wait The Process !!!');
            setTimeout(() => {
                toast.dismiss(loadingToast);
            }, 2500);
            return;
        }

        e.preventDefault()
        setLoading(true);
        setErrors(null);

        const formData = new FormData();
        formData.append('username', Data.username)
        formData.append('password', Data.password)

        axios.post('/api/v1/auth/login', formData).then(res => {

            if (res.data.status) {
                localStorage.setItem('authToken', 'Bearer ' + res.data.data.token);
            }

            setTimeout(() => {
                window.location.reload();
            }, 1000)

        }).catch(err => {
            setLoading(false);
            if (err.response?.data?.res.code == 422) {
                setErrors(err?.response?.data?.data);
            } else {
                toast.error(err?.response?.data?.message);
            }
        }).finally(() => {
            setLoading(false)
        })

    }

    const ComLoading = () => {
        return (
            <div role="status">
                <svg aria-hidden="true" className="inline w-6 h-6 mr-2 text-white animate-spin dark:text-gray-800 fill-white dark:bg-transparent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        )
    }

    return (
        <div className={`h-screen flex items-center justify-center`}>
            <Toaster />
            <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D" className='absolute top-0 w-full h-screen object-fill -z-10' alt="" />
            <div className=" bg-white flex p-5 rounded-lg shadow-xl">
                <div className="w-1/2 flex">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="bg-blue-700 rounded-lg object-contain"
                        alt="Sample image"
                    />
                </div>
                <div className="w-1/2 flex flex-col p-5">
                    <span className='text-xl text-center font-semibold text-black'>Login Your Account Here!</span>
                    <form onSubmit={Login} className="flex flex-col text-start mt-5">
                        <div className="flex flex-col mb-10">
                            <input type="text" id="username" className='focus:outline-none focus:border-b-blue-500 bg-transparent border-b-[2px] p-4 text-black transition-colors duration-200 text-lg placeholder-gray-400' placeholder='Username/Email' autoComplete='off' name='username' onChange={HandleChange} />
                            {Errors?.username ? (
                                <div className="text-red-700 px-2 mt-2">
                                    {Errors?.username?.map((item, index) => (
                                        <li key={index} className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col mb-10">
                            <input type="password" id="password" className='focus:outline-none focus:border-b-blue-500 bg-transparent border-b-[2px] p-4 text-black transition-colors duration-200 text-lg placeholder-gray-400' placeholder='Password' autoComplete='off' name='password' onChange={HandleChange} />
                            {Errors?.password ? (
                                <div className="text-red-700 px-2 mt-2">
                                    {Errors?.password?.map((item, index) => (
                                        <li key={index} className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex justify-center w-fu ll mt-2 mb-5">
                            <button className='bg-blue-700 hover:bg-blue-600 transition-all duration-200 text-white font-semibold shadow-white w-full p-2 rounded-lg active:scale-95' type='submit' disabled={loading}>{loading ? (<ComLoading />) : "Login"}</button>
                        </div>
                        <div className="flex w-full justify-start font-semibold">
                            <Link className='text-gray-400 hover:text-black' to="/">Back To Home</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
