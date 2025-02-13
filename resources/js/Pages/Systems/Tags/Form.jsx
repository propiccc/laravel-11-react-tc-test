import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Create from '../../../Components/Button/Create'
import Update from '../../../Components/Button/Update'
import Cancel from '../../../Components/Button/Cancel'
import toast from 'react-hot-toast';
import FormLoading from '../../../Components/Loading/FormLoading';


const Form = ({ DataEdit, getDataTable, setFormToggle, Type }) => {
    // ? Data
    const [Errors, setErrors] = useState(null);

    // ? Loading Data
    const [Loading, setLoading] = useState(false);


    // ? Form Input
    const [TagsName, setTagsName] = useState(DataEdit?.tags_name ?? "");



    // ? Function
    const HandleSubmit = async (e) => {
        e.preventDefault();

        if (Loading) {
            const loadingToast = toast.loading('Wait The Process !!!');
            setTimeout(() => {
                toast.dismiss(loadingToast);
            }, 2500);
            return;
        }

        setErrors(null);
        setLoading(true);


        const dataForm = new FormData();
        var url = '/api/v1/tags/store';
        if (Type == 'update') {
            url = `/api/v1/tags/${DataEdit.uuid}/update`;
            dataForm.append('_method', 'PUT');
        }

        dataForm.append('tags_name', TagsName);

        try {
            const res = await axios.post(url, dataForm);
            toast.success(res.data.message);
            getDataTable();
            HandleClearInput();
            setFormToggle(false);
        } catch (err) {
            setLoading(false)
            if (err.response?.data?.res.code == 422) {

                setErrors(err?.response?.data?.data?.errors);
            } else {
                toast.error(err?.response?.data?.message);
            }
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 600);
        }
    }


    const HandleClearInput = (type) => {
        setTagsName("");
    };

    const CloseForm = () => {
        HandleClearInput();
        setFormToggle(false)
    }

    // ? Effect



    return (
        <>
            <form onSubmit={HandleSubmit} className='w-full relative'>
                <div className="flex justify-between border-b-[1px] border-gray-400 bg-neutral-100 text-black rounded-t-md px-3 p-2 items-center">
                    <span className="font-semibold">Tags Form</span>
                </div>
                <div className='bg-white'>
                    {Loading && (<FormLoading />)}
                    <div className="flex flex-wrap gap-2 xl:flex-col w-full px-3 py-2">

                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="tags_name">Name Tags <span className='font-semibold text-red-600'>*</span></label>
                            <input value={TagsName ?? ""} onChange={(tag) => setTagsName(tag.target.value)} className={`p-1 border  ${Errors?.tags_name ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='name_tags' type="text" placeholder='Enter Name Tag' autoComplete='off' />
                            {Errors?.tags_name ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.tags_name?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                    </div>
                </div>
                <div className="flex gap-x-1 bg-neutral-100 text-black mb-2 rounded-b-md px-3 p-2 items-center">
                    <Cancel onClick={() => CloseForm(false)} />
                    {Type == 'create' && (<Create Disable={Loading} />)}
                    {Type == 'update' && (<Update Disable={Loading} />)}
                </div>
            </form>
        </>
    )
}

export default Form
