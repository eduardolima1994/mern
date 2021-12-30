import React, {useState, useEffect} from 'react';
import api from './api';
import { login, logout, getToken } from './auth';
import { Route, Routes, Outlet, Navigate } from 'react-router-dom';


export default function WAuth() {
    const [redirect, setRedirect] = useState(true);

    console.log(redirect)

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/usuarios/checktoken', {params:{token:getToken()}});

            if (res.data.status === 200){
                setRedirect(false);
                console.log('Passei aqui!')
            }else{
                logout();
                setRedirect(true);
            }
        }
        verify();
    },[]);

    console.log(redirect)

    return(
        redirect===false?
            <Outlet/>: 
            <Navigate to={{pathname:"/admin/login"}}/>
    )
}

