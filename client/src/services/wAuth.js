import React, {useState, useEffect} from 'react';
import api from './api';
import { login, logout, getToken } from './auth';
import { Route, Routes, Navigate } from 'react-router-dom';


export default function WAuth({component: Component, ...rest}, props) {
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function verify(){
            var res = await api.get('/api/usuarios/checktoken', {params:{token:getToken()}});

            if (res.data.status === 200){
                setLoading(false);
                setRedirect(false);
            }else{
                logout();
                setLoading(false);
                setRedirect(true);
            };
        };
        verify();
    },[]);

    return(
        loading?'Carregando...':
        <Route { ...rest} render={
            props => 
            !redirect?( <Component {...props} /> ) : 
            <Navigate to={{pathname:"/admin/login", state:{ from: props.location }}}/>
        }/>
    )
}

