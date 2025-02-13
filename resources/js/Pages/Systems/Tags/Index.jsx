import React, { useEffect, useState } from 'react'
import Edit from '../../../Components/Button/Edit';
import Delete from '../../../Components/Button/Delete';
import Add from '../../../Components/Button/Add';
import TableLoading from '../../../Components/Loading/TableLoading';
import NoDataTable from '../../../Components/NoDataTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import Form from './Form';
import toast from 'react-hot-toast';
import moment from 'moment';

const Index = () => {
    const [Block, setBlock] = useState(false);
    const [EditBlock, setEditBlock] = useState(false);

    // ? Data
    const [Data, setData] = useState(null);

    // ? Form Data
    const [FormToggle, setFormToggle] = useState(false);
    const [Type, setType] = useState('create');
    const [DataEdit, setDataEdit] = useState(null);

    // ? Paginate Data
    const [Paginate, setPginate] = useState({
        limit: 10,
        search: ""
    });

    // ? Function
    const getDataTable = (url = null) => {
        var url = url == null ? '/api/v1/tags?' + `limit=${Paginate.limit}&search=${Paginate.search}` : '/api' + url.split('/api')[1] + `&limit=${Paginate.limit}&search=${Paginate.search}`;
        setBlock(true);
        axios.get(url).then(res => {
            setData(res.data.data);
        }).catch(err => {
            setData(null);
            toast.error(err.response.data.message);
        }).finally(() => {
            setBlock(false);
        });
    }

    const HandleCreate = () => {
        setType('create');
        setFormToggle(true);
        setDataEdit(null);
    }

    const getDataEdit = async (uuid) => {

        if (EditBlock) return;

        setFormToggle(false);
        setEditBlock(true);
        const loadingToast = toast.loading('Loading...');

        try {
            const res = await axios.post(`/api/v1/tags/${uuid}/show`);
            setDataEdit(res.data.data);

        } catch (error) {
            setDataEdit(null);
            setFormToggle(false);
            toast.error(error.response.data.message);
        } finally {

            setType('update');
            setFormToggle(true);
            setEditBlock(false);
            toast.remove(loadingToast);
        }
    }

    const DeleteData = (uuid) => {
        setBlock(true);
        setFormToggle(false);
        setDataEdit(null);
        var url = `/api/v1/tags/${uuid}/delete`
        axios.delete(url).then(res => {
            toast.success(res.data.message);
            getDataTable();
        }).catch(err => {
            toast.error(err?.response?.data?.message);
        }).finally(() => {
            setBlock(true);
        })
    }

    const HandleConfirmDelete = async (uuid) => {
        Swal.fire({
            title: "Apakah Anda Yakin?",
            text: "Tidak Bisa Mengembalikan Data Yang Di Hapus, Jika Sudah Di Hapus!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yaa, Hapus!"
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteData(uuid);
            }
        });
    }

    // ? Effect
    useEffect(() => {
        var debounce = setTimeout(() => {
            getDataTable();
        }, 600);
        return () => clearTimeout(debounce);
    }, [Paginate])




    return (
        <>
            {FormToggle ? (<Form Type={Type} DataEdit={DataEdit} getDataTable={() => getDataTable()} setFormToggle={setFormToggle} />) : null}
            <div className="flex justify-between border-b-[1px] border-gray-400 bg-neutral-100 text-black rounded-t-md px-3 p-2 items-center">
                <span className="font-semibold">Posts Data</span>
                {!FormToggle ? (<Add onClick={() => HandleCreate()} />) : null}
            </div>
            <div className='bg-white p-2 h-[calc(100vh-175px)] overflow-y-auto'>
                <div className="flex flex-col">
                    <div className="flex flex-wrap justify-between">
                        <div className="flex flex-wrap items-center gap-x-2">
                            <label htmlFor="show" className=''>Show : </label>
                            <select id='show' className='border border-gray-400 p-1 rounded-md' onChange={(tag) => setPginate(el => ({ ...el, limit: parseInt(tag.target.value) }))}>
                                <option value={10} selected={Paginate.limit == 10}>10</option>
                                <option value={50} selected={Paginate.limit == 50}>50</option>
                                <option value={100} selected={Paginate.limit == 100}>100</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-2">
                            <label htmlFor="">Search :</label>
                            <input value={Paginate?.search} onChange={(tag) => setPginate(el => ({ ...el, search: tag.target.value }))} type="text" placeholder='Search' className='border p-1 rounded-md border-gray-400 w-[150px]' />
                        </div>
                    </div>
                    <div className="overflow-x-auto w-full">
                        <div className="flex w-full py-2">
                            <div className="min-w-full">
                                <table
                                    className="w-full text-sm text-surface text-black">
                                    <thead
                                        className="border-b border-gray-200 bg-[#00114d] sticky top-0 text-white">
                                        <tr className='sticky top-0'>
                                            <th scope="col" className="whitespace-nowrap py-2 px-5">No.</th>
                                            <th scope="col" className="whitespace-nowrap py-2 text-start">Tag Name</th>
                                            <th scope="col" className="whitespace-nowrap py-2 text-start">Created At</th>
                                            <th scope="col" className="whitespace-nowrap py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Data?.data && !Block ? (
                                            Data?.data?.map((item, index) => (
                                                <>
                                                    <tr key={index} className="border-b border-gray-200">
                                                        <td key={index} className="whitespace-pre-line text-center font-semibold py-2 w-[10px]">{index + Data?.from}</td>
                                                        <td className="whitespace-pre-line py-2 ">{item.tags_name}</td>
                                                        <td className="whitespace-pre-line py-2 ">{moment(`${item.created_at}`).format('MMMM DD YYYY, h:mm:ss')}</td>
                                                        <td className="whitespace-pre-line py-2 ">
                                                            <div className="flex gap-x-1 justify-center">
                                                                <Edit onClick={() => getDataEdit(item.uuid)} />
                                                                <Delete onClick={() => HandleConfirmDelete(item.uuid)} />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </>
                                            ))
                                        ) : null}

                                        {Block ? (<TableLoading colSpan={6} />) : null}
                                        {Data?.data?.length == 0 && !Block && <NoDataTable />}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap justify-between bg-neutral-100 text-black rounded-b-md px-3 p-2 items-center">
                <div className="">
                    <span className='text-sm font-semibold'>Page {Data?.current_page} of {Data?.last_page}</span>
                </div>
                <nav className=''>
                    {Data?.data != null ? (
                        <ul className="flex flex-wrap text-sm">
                            <li>
                                <button onClick={() => getDataTable(Data?.links[0]?.url)} className="flex items-center justify-center px-2 h-7 leading-tight text-[#00092b] bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-[#001664] hover:text-white">Previous</button>
                            </li>
                            {Data?.links?.map((item, index) => (
                                <>
                                    {index != 0 && Data?.links.length - 1 != index ? (
                                        <li key={index}>
                                            <button key={index} onClick={() => getDataTable(item.url != null ? item.url : null)} className={`flex items-center justify-center px-2 h-7 leading-tight border border-gray-300 hover:bg-[#001664] hover:text-white ${item.active ? "bg-[#001664] text-white" : null}`}>{item.label}</button>
                                        </li>
                                    ) : null}
                                </>
                            ))}
                            <li>
                                <button onClick={() => getDataTable(Data?.links[Data.links.length - 1]?.url)} className="flex items-center justify-center px-2 h-7 leading-tight text-[#001664] bg-white border border-gray-300 rounded-e-lg hover:bg-[#001664] hover:text-white">Next</button>
                            </li>
                        </ul>
                    ) : null}
                </nav>
            </div>
        </>
    )
}

export default Index
