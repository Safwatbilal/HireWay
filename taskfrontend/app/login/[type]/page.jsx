'use client';
import { use } from "react";
import Login from "@/components/Auth/Login";
const LoginPage = ({ params }) => {
    const { type } =use( params); 
    return (
        <Login type={type}></Login>
    );
};

export default LoginPage; 
