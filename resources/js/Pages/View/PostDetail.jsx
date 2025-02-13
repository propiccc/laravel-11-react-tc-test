import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingPage from '../../Components/Loading/LoadingPage';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthContex';


const PostDetail = () => {

    // ? url params
    const { uuid } = useParams();
    const { user, HandleLogout } = useContext(AuthContext);
    const Navigate = useNavigate();
    const [Errors, setErrors] = useState([]);
    const [Block, setBlock] = useState(false);
    const [PostDetail, setPostDetail] = useState({});
    const [Comment, setComment] = useState("");

    //? Func

    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (Block) {
            const loadingToast = toast.loading('Wait The Process !!!');
            setTimeout(() => {
                toast.dismiss(loadingToast);
            }, 2500);
            return;
        }

        setErrors(null);
        setBlock(true);


        const dataForm = new FormData();
        var url = `/api/v1/comment/${PostDetail.uuid}/add`;
        dataForm.append('comment', Comment);

        try {
            const res = await axios.post(url, dataForm);
            toast.success(res.data.message);
            getDataPostsDetail();
            setFormToggle(false);
        } catch (err) {
            setBlock(false)
            if (err.response?.data?.res.code == 422) {
                setErrors(err?.response?.data?.data?.errors);
            } else {
                toast.error(err?.response?.data?.message);
            }
        } finally {
            setTimeout(() => {
                setBlock(false)
            }, 600);
        }
    }

    const getDataPostsDetail = () => {
        setBlock(true);
        var url = `/api/v1/posts/${uuid}/detail`;
        axios.get(url).then(res => {
            setPostDetail(res.data.data);
        }).catch(error => {
            toast.error(error.response.data.message);
            setTimeout(() => {
                Navigate('/');
            }, 200);
        }).finally(() => {
            setBlock(false);
        })
    }

    useEffect(() => {
        getDataPostsDetail();
    }, []);




    return (
        <div>
            <nav class="bg-white border-gray-200 dark:bg-gray-900">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" /> */}
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Test Posts</span>
                    </a>
                    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="/" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Home</a>
                            </li>
                            {user == null ? (
                                <>
                                    <li>
                                        <a href="/login" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</a>
                                    </li>
                                    <li>
                                        <a href="/register" class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</a>
                                    </li>
                                </>

                            ) : (
                                <li>
                                    <div onClick={() => HandleLogout()} class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Logout</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex w-full justify-center min-h-screen pt-5">
                <div className="w-1/2 border-x-[2px] border-gray-100 px-2">
                    {Block ? (<LoadingPage />) : (
                        <>
                            <div className="flex flex-col">
                                <span className='text-4xl font-bold'>
                                    {PostDetail?.title}
                                </span>
                                <div className="flex w-full mt-4 gap-x-1">
                                    {PostDetail?.tags?.map((tag, index) => (
                                        <button key={index} className='bg-gray-600 cursor-default text-white text-sm py-1 px-3 rounded-2xl'>
                                            <span>{tag.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="border-[1px] w-full border-gray-200 my-4"></div>
                            <div className="h-[50vh] overflow-y-scroll scrollbar-none">
                                <p>
                                    {PostDetail.content}
                                </p>
                            </div>


                            <div className="flex flex-col mt-5">
                                <span className='text-4xl font-bold'>
                                    Comments
                                </span>
                            </div>
                            <div className="border-[1px] w-full border-gray-200 my-4"></div>
                            <div className="flex flex-col gap-y-2 overflow-y-scroll h-[70vh] scrollbar-none">
                                {PostDetail?.comments?.map((comt, index) => (
                                    <div key={index} className="border-[1px] p-4 rounded-md border-gray-400">

                                        <span className='font-semibold text-sm'>{comt.user.name}</span>
                                        <div className="border-[1px] w-full border-gray-200 my-2"></div>
                                        <p>
                                            {comt.comment}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            {user != null ? (
                                <div className="border-t-[1px] border-gray-700 sticky bottom-0 p-2 bg-white">
                                    <form onSubmit={HandleSubmit}>
                                        <div className="flex gap-x-1">
                                            <input type="text" onChange={(e) => setComment(e.target.value)} className='w-full px-2 py-2 focus:outline-none focus:border-blue-700 border-[1px] border-black rounded-md' />
                                            <button type='submit' className='px-3 py-2 bg-blue-700 border-[1px] border-blue-700 text-white font-semibold rounded-md'>
                                                Send
                                            </button>
                                        </div>
                                        <div className="">
                                            {Errors?.comment ? (
                                                <div className="text-red-700 px-2">
                                                    {Errors?.comment?.map((item, index) => (
                                                        <li className='text-sm'>{item}</li>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    </form>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostDetail
