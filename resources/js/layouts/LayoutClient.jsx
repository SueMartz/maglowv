import React, { useEffect } from 'react';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router-dom';
import AuthUser from '../Pageauth/AuthUser';

const LayoutClient = () => {
    const { getRol } = AuthUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (getRol()?.toLowerCase() !== "cliente") {
            navigate("/");
        }
    }, [])

    return (
        <div>
            <h1>Equipo</h1>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default LayoutClient 
