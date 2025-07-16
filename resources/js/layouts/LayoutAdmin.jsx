import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthUser from '../Pageauth/AuthUser';



const LayoutAdmin = () => {
    const{getRol}=AuthUser()
    const navigate = useNavigate()

    useEffect(()=>{
        if(getRol()!="admin"){
            navigate("/")
        }
    },[])

    return(
         <div>
           
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default LayoutAdmin 
