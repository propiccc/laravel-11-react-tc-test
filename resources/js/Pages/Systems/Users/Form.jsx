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
    const [Username, setUsername] = useState(DataEdit?.name ?? "");
    const [Email, setEmail] = useState(DataEdit?.email ?? "");
    const [Password, setPassword] = useState("");
    const [PasswordConfirm, setPasswordConfirm] = useState("");

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
        var url = '/api/v1/user/store';
        if (Type == 'update') {
            url = `/api/v1/user/${DataEdit.uuid}/update`;
            dataForm.append('_method', 'PUT');
        }

        if (Password != PasswordConfirm && Type == 'create') {
            setTimeout(() => {
                setLoading(false)
            }, 500);
            return setErrors({
                password: ['Password Confirmation Must Be A Same.']
            })
        }

        dataForm.append('username', Username);
        dataForm.append('email', Email);
        dataForm.append('password', Password);
        dataForm.append('password_confirmation', PasswordConfirm);

        try {
            const res = await axios.post(url, dataForm);
            toast.success(res.data.message);
            getDataTable();
            HandleClearInput();
            setFormToggle(false);
        } catch (err) {
            setLoading(false)
            if (err.response?.data?.res.code == 422) {
                setErrors(err?.response?.data?.data);
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
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setErrors(null)
    };

    const CloseForm = () => {
        HandleClearInput();
        setFormToggle(false)
    }


    // FIXME : Update Api Response
    // FIXME : Update Error Ahndling Error Server & Validation

    // ? Effect



    return (
        <>
            <form onSubmit={HandleSubmit} className='w-full relative'>
                <div className="flex justify-between border-b-[1px] border-gray-400 bg-neutral-100 text-black rounded-t-md px-3 p-2 items-center">
                    <span className="font-semibold">Users Form</span>
                </div>
                <div className='bg-white'>
                    {Loading && (<FormLoading />)}
                    <div className="flex flex-wrap gap-2 xl:flex-col w-full px-3 py-2">
                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="username">Username <span className='font-semibold text-red-600'>*</span></label>
                            <input value={Username ?? ""} onChange={(tag) => setUsername(tag.target.value)} className={`p-1 border  ${Errors?.username ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='username' type="text" placeholder='Enter Username' autoComplete='off' />
                            {Errors?.username ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.username?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="email">Email <span className='font-semibold text-red-600'>*</span></label>
                            <input value={Email ?? ""} onChange={(tag) => setEmail(tag.target.value)} className={`p-1 border ${Errors?.email ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='email' type="email" placeholder='Enter Email' autoComplete='off' />
                            {Errors?.email ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.email?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="password">Password <span className='font-semibold text-red-600'>*</span></label>
                            <input value={Password ?? ""} onChange={(tag) => setPassword(tag.target.value)} className={`p-1 border ${Errors?.password ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='password' type="password" placeholder='Enter Password' autoComplete='off' />
                            {Errors?.password ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.password?.map((item, index) => (
                                        <li className='text-sm'>{item}</li>
                                    ))}
                                </div>
                            ) : null}
                        </div>
                        <div className="flex flex-col w-full md:w-[15rem] xl:w-2/6 gap-y-1">
                            <label className='font-semibold' htmlFor="password_confirmation">Password Confirmation <span className='font-semibold text-red-600'>*</span></label>
                            <input value={PasswordConfirm ?? ""} onChange={(tag) => setPasswordConfirm(tag.target.value)} className={`p-1 border ${Errors?.password ? 'border-red-700' : 'border-gray-400'} rounded-md focus:outline-blue-700 focus:outline-1`} id='password_confirmation' type="password" placeholder='Enter Password Confirmation' autoComplete='off' />
                            {Errors?.password ? (
                                <div className="text-red-700 px-2">
                                    {Errors?.password?.map((item, index) => (
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
