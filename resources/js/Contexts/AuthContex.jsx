import { createContext, useEffect, useState } from 'react';
import axios from 'axios'
import LoadingPage from '../Components/Loading/LoadingPage';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(false);

    var a = true;
    useEffect(() => {
        if (a) {
            setLoading(true);
            axios.post('/api/v1/auth/check')
                .then((res) => {
                    if (res.data.data.auth) {
                        setUser(res.data.data.user);
                    }
                }).catch(res => {
                    setUser(null);
                }).finally(() => {
                    setLoading(false);
                })
        }

        return () => {
            a = false;
        }

    }, []);

    const HandleLogout = () => {
        axios.post('/api/v1/auth/logout').then(res => {
            localStorage.removeItem('authToken');
            setTimeout(() => {
                window.location.reload();
            }, 400);
            localStorage.removeItem('authToken');
        }).catch(err => {
            setTimeout(() => {
                localStorage.removeItem('authToken');
                window.location.reload();
            }, 400);
        })
    }

    // Login
    // const login = async (email, password) => {
    //     try {
    //         const res = await axios.post('/login', { email, password });
    //         const { token, user } = res.data;
    //         localStorage.setItem('authToken', token);
    //         setToken(token);
    //         setUser(user);
    //         return true;
    //     } catch (error) {
    //         console.error('Login gagal:', error);
    //         return false;
    //     }
    // };

    // Logout
    // const logout = async () => {
    // try {
    //     await axios.post('/api/v1/auth/logout');
    // } catch (error) {
    //     console.log(error);
    //     toast.error(error.response.message);
    // }

    // localStorage.removeItem('authToken');
    // setUser(null);
    // };

    return (
        <AuthContext.Provider value={{ user, HandleLogout }}>
            {Loading ? (
                <LoadingPage />
            ) : (
                <>
                    {children}
                </>
            )}
        </AuthContext.Provider>
    );
};
