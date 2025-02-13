import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Create from '../../../Components/Button/Create'
import Update from '../../../Components/Button/Update'
import Cancel from '../../../Components/Button/Cancel'
import toast from 'react-hot-toast';
import FormLoading from '../../../Components/Loading/FormLoading';
import Select from 'react-select';


const Form = ({ DataEdit, getDataTable, setFormToggle, Type }) => {
    // ? Data
    const [Errors, setErrors] = useState(null);
    const [TagsOptions, setTagsOptions] = useState([
        { label: "Test 123", value: '1' },
        { label: "Test 13", value: '2' },
        { label: "Test 12", value: '3' },
    ]);


    // ? Loading Data
    const [Loading, setLoading] = useState(false);


    // ? Form Input
    const [Title, setTitle] = useState(DataEdit?.title ?? "");
    const [Content, setContent] = useState(DataEdit?.content ?? "");
    const [Tags, setTags] = useState(DataEdit?.tags ?? []);

    //  ? Select Style
    const customStyles = {
        control: provided => ({
            ...provided,
            border: '1px solid #000',
            borderRadius: '8px',
            '&:hover': {
                borderColor: '#0056b3',
            },
        }),
    };

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
        var url = '/api/v1/posts/store';
        if (Type == 'update') {
            url = `/api/v1/posts/${DataEdit.uuid}/update`;
            dataForm.append('_method', 'PUT');
        }

        dataForm.append('title', Title);
        dataForm.append('content', Content);
        dataForm.append('tags', JSON.stringify(Tags));

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

    const GetSelectTags = () => {
        setLoading(true);
        axios.post('/api/v1/tags/select').then(res => {
            setTagsOptions(res.data.data);
        }).catch(err => {
            toast.error(err?.response?.data?.message);
            setFormToggle(false);
        }).finally(() => setLoading(false));
    }


    const HandleChangeTagsSelect = (select) => {
        setTags(select)
    }

    const HandleClearInput = (type) => {
        setTitle("");
        setContent("");
    };

    const CloseForm = () => {
        HandleClearInput();
        setFormToggle(false)
    }


    // FIXME : Update Api Response
    // FIXME : Update Error Ahndling Error Server & Validation

    // ? Effect

    useEffect(() => {
        GetSelectTags();
    }, []);



    return (
        <>
            <form onSubmit={HandleSubmit} className='w-full relative'>
                <div className="flex justify-between border-b-[1px] border-gray-400 bg-neutral-100 text-black rounded-t-md px-3 p-2 items-center">
                    <span className="font-semibold">Posts Form</span>
                </div>
                <div className='bg-white'>
                    {Loading && (<FormLoading />)}
                    <div className="flex flex-wrap gap-2 xl:flex-col w-full px-3 py-2">

                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="title">Title <span className='font-semibold text-red-600'>*</span></label>
                            <input value={Title ?? ""} onChange={(tag) => setTitle(tag.target.value)} className={`p-1 border  ${Errors?.title ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='title' type="text" placeholder='Enter title' autoComplete='off' />
                            {Errors?.title ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.title?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="content">Content <span className='font-semibold text-red-600'>*</span></label>
                            <textarea onChange={(tag) => setContent(tag.target.value)} className={`p-1 border  ${Errors?.content ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='Content' type="text" placeholder='Enter Content' autoComplete='off'>
                                {Content}
                            </textarea>
                            {Errors?.content ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.content?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>


                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="AkunType">Tags <span className='font-semibold text-red-600'>*</span></label>
                            <Select
                                options={TagsOptions ?? []}
                                styles={customStyles}
                                isMulti
                                value={Tags ?? []}
                                onChange={HandleChangeTagsSelect}
                            />
                            {Errors?.tags ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.tags?.map((item, index) => (
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
