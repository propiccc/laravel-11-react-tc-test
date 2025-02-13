import React, { useContext, useEffect, useState } from 'react'

import LoadingPage from '../../Components/Loading/LoadingPage';
import axios from 'axios';
import { AuthContext } from '../../Contexts/AuthContex';
const Home = () => {

    // ? Setup
    const { user, HandleLogout } = useContext(AuthContext);
    const [PostData, setPostData] = useState([]);
    const [Tags, setTags] = useState([]);

    // ? Loading Data
    const [Blocks, setBlock] = useState(false);


    // ? Paginate Data
    const [Paginate, setPginate] = useState({
        limit: 10,
        search: ""
    });

    const [Filter, setFilter] = useState({
        tag: 'all-tag'
    });

    // ? Function

    const getDataTags = () => {
        setBlock(true);
        axios.post('/api/v1/tags/select').then(res => {
            setTags(res.data.data);
        }).catch(err => {
            setTags([]);
        }).finally(() => {
            setBlock(false);
        })
    }
    const getDataPost = (url = null) => {
        var url = url == null ? '/api/v1/public/posts?' + `limit=${Paginate.limit}&search=${Paginate.search}&tag=${Filter.tag}` : '/api' + url.split('/api')[1] + `&limit=${Paginate.limit}&search=${Paginate.search}&tag=${Filter.tag}`;
        setBlock(true);
        axios.get(url).then(res => {
            setPostData(res.data.data);
        }).catch(err => {
            setPostData(null);
            toast.error(err.response.data.message);
        }).finally(() => {
            setBlock(false);
        });
    }

    // ? Effect
    useEffect(() => {
        var debounce = setTimeout(() => {
            getDataPost();
        }, 600);
        return () => clearTimeout(debounce);
    }, [Paginate, Filter])

    useEffect(() => {
        getDataTags();
    }, []);

    return (
        <div className="">
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

            <div className='p-10 h-[calc(100vh-130px)] overflow-y-auto'>
                <div className="flex justify-center">
                    <form class="flex w-1/2 gap-x-1">
                        <div class="flex w-full">
                            <input type="text" value={Paginate?.search} onChange={(tag) => setPginate(el => ({ ...el, search: tag.target.value }))} className='bg-gray-100 w-full border-solid border-[1px] border-gray-400 py-2 px-2 rounded-lg' placeholder='Search' />
                        </div>

                        <div class="w-1/4">
                            <select id="default-search"
                                onChange={(e) => setFilter(prev => ({ ...prev, tag: e.target.value }))}
                                className="bg-gray-100 w-full border-solid border-[1px] border-gray-400 py-2 px-2 rounded-lg">
                                <option value="all-tag">All Tags</option>
                                {Tags && Tags?.map((tag, index) => (
                                    <option key={index} selected={Filter.tag == tag.value} value={tag.value}>{tag.label}</option>
                                ))}

                            </select>
                        </div>
                    </form>

                </div>
                <div className="border-[1px] w-full border-black my-2"></div>
                {
                    Blocks ? <LoadingPage /> : (
                        <div className="flex flex-wrap justify-center gap-2">
                            {PostData?.data && PostData?.data.map((item, index) => (
                                <a href={`/posts/${item.uuid}/detail`} className="h-[250px] overflow-y-auto scrollbar-none bg-gray-800 cursor-pointer hover:bg-gray-700 transition-all duration-300 rounded-md p-1">
                                    <div key={index} href="#" class="block max-w-sm p-6  rounded-lg shadow-sm   h-full">
                                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                                        {item.posts_tag.length != 0 ? (
                                            <div className="flex h-[50px] text-white rounded-b-md py-2 gap-x-1 overflow-x-scroll w-full scrollbar-none">
                                                {item?.posts_tag && item?.posts_tag.map((tag, index) => (
                                                    <button onClick={() => setFilter(prev => ({ ...prev, tag: tag.tags_id }))} className='bg-gray-600 text-sm p-1 rounded-2xl'>
                                                        <span>{tag.tag.tags_name}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : null}

                                        <p class="font-normal text-gray-700 dark:text-gray-400">{item.content}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )
                }
            </div >

            <div className="border-[1px] w-full border-black my-2"></div>

            <div className="flex flex-wrap justify-between text-black rounded-b-md px-3 p-2 items-center h-full">
                <div className="">
                    <span className='text-sm font-semibold'>Page {PostData?.current_page} of {PostData?.last_page}</span>
                </div>
                <nav className=''>
                    {PostData?.data != null ? (
                        <ul className="flex flex-wrap text-sm">
                            <li>
                                <button onClick={() => getDataPost(PostData?.links[0]?.url)} className="flex items-center justify-center px-2 h-7 leading-tight text-[#00092b] bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-[#001664] hover:text-white">Previous</button>
                            </li>
                            {PostData?.links?.map((item, index) => (
                                <>
                                    {index != 0 && PostData?.links.length - 1 != index ? (
                                        <li key={index}>
                                            <button key={index} onClick={() => getDataPost(item.url != null ? item.url : null)} className={`flex items-center justify-center px-2 h-7 leading-tight border border-gray-300 hover:bg-[#001664] hover:text-white ${item.active ? "bg-[#001664] text-white" : null}`}>{item.label}</button>
                                        </li>
                                    ) : null}
                                </>
                            ))}
                            <li>
                                <button onClick={() => getDataPost(PostData?.links[PostData?.links?.length - 1]?.url)} className="flex items-center justify-center px-2 h-7 leading-tight text-[#001664] bg-white border border-gray-300 rounded-e-lg hover:bg-[#001664] hover:text-white">Next</button>
                            </li>
                        </ul>
                    ) : null}
                </nav>
            </div>
        </div >
    )
}

export default Home

