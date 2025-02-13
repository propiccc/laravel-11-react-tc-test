import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingPage from '../../Components/Loading/LoadingPage';

const Login = ({ Type = 'login' }) => {

    const [Loading, setLoading] = useState(true);
    const Redirect = useNavigate();
    const [Auth, setAuth] = useState(null);


    const HandleCheck = () => {
        setLoading(true);
        axios.post('/api/v1/auth/check').then(res => {
            setAuth(res.data.data);
        }).catch(error => {
            if (error.response?.status === 401) {
                setAuth({auth: false});
            }
        }).finally(() => {
            setLoading(false);
        });
    }


    useEffect(() => {
        HandleCheck();
    }, [])

    if (Loading) {
        return <LoadingPage />
    }


    if (Type == 'login') {
        if (!Auth.auth) {
            return <Outlet />
        } else {
            Redirect('/system/dashboard')
        }
    }

    if (Type == 'check') {
        if (Auth.auth &&  Auth.user.role == 'admin') {
            return <Outlet />
        } else {
            Redirect('/')
        }
    }



}

export default Login
