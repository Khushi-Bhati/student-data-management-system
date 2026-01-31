import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protectedroute = () => {

    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to={"/login"} />
    }


    return (
        <Outlet />
    )
}

export default Protectedroute